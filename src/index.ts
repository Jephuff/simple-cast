import loadScript from "./loadScript";
import { emitter, CastEvent } from "./emitter";

let initPromise: Promise<{
  player: cast.framework.RemotePlayer;
  playerController: cast.framework.RemotePlayerController;
}> | void;

const getInitPromise = async () => {
  if (!initPromise) {
    throw new Error("must call `simpleCast.init()` before using any methods");
  }
  return initPromise;
};

const hasContentId = (
  obj: unknown
): obj is { contentId: string; metadata: Object | undefined } => {
  return !!(
    typeof obj === "object" &&
    obj &&
    (obj as { contentId?: string }).contentId
  );
};

const getMediaSession = async () => {
  await getInitPromise();
  const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
  return castSession && castSession.getMediaSession();
};

const connect = async () => {
  await getInitPromise();
  let castSession = cast.framework.CastContext.getInstance().getCurrentSession();
  if (!castSession) {
    await cast.framework.CastContext.getInstance().requestSession();
    castSession = cast.framework.CastContext.getInstance().getCurrentSession();
  }
  if (!castSession) throw new Error("failed to connect");
  return castSession;
};

const isPlaying = async () => {
  const mediaSession = await getMediaSession();
  const playerState = mediaSession && mediaSession.playerState;
  return playerState === chrome.cast.media.PlayerState.PLAYING;
};

const seek = async (time: number) => {
  const { playerController, player } = await getInitPromise();
  player.currentTime = Math.floor(time);
  playerController.seek();
};

export { CastEvent, ValueForEvent } from "./emitter";
export default {
  on: emitter.on.bind(emitter),
  off: emitter.off.bind(emitter),
  init: async (applicationId?: string) => {
    const init = async (applicationId?: string) => {
      await loadScript();

      cast.framework.CastContext.getInstance().setOptions({
        receiverApplicationId:
          applicationId || chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.TAB_AND_ORIGIN_SCOPED,
      });

      const player = new cast.framework.RemotePlayer();
      const playerController = new cast.framework.RemotePlayerController(
        player
      );

      let media: chrome.cast.media.Media | null | void;
      let subtitlesOn = false;

      playerController.addEventListener(
        cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED,
        ({ value }) => emitter.emit(CastEvent.Connected, !!value)
      );

      playerController.addEventListener(
        cast.framework.RemotePlayerEventType.CURRENT_TIME_CHANGED,
        ({ value }) => {
          if (typeof value === "number") {
            emitter.emit(CastEvent.Progress, value);
          }
        }
      );

      playerController.addEventListener(
        cast.framework.RemotePlayerEventType.DURATION_CHANGED,
        ({ value }) => {
          if (typeof value === "number") {
            emitter.emit(CastEvent.Duration, value);
          }
        }
      );

      playerController.addEventListener(
        cast.framework.RemotePlayerEventType.PLAYER_STATE_CHANGED,
        ({ value }) => {
          if (value === chrome.cast.media.PlayerState.PLAYING) {
            emitter.emit(CastEvent.Playing, true);
          } else if (value === chrome.cast.media.PlayerState.PAUSED) {
            emitter.emit(CastEvent.Playing, false);
          }
        }
      );

      playerController.addEventListener(
        cast.framework.RemotePlayerEventType.IS_MEDIA_LOADED_CHANGED,
        ({ value }) => {
          if (
            !value &&
            media &&
            media.idleReason === chrome.cast.media.IdleReason.FINISHED
          ) {
            emitter.emit(CastEvent.Finished, media.media.contentId);
            media = null;
          }
        }
      );

      playerController.addEventListener(
        cast.framework.RemotePlayerEventType.MEDIA_INFO_CHANGED,
        ({ value }) => {
          if (hasContentId(value)) {
            emitter.emit(CastEvent.CurrentFile, value.contentId);
            emitter.emit(CastEvent.MetaData, value.metadata);
            const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
            if (!castSession) return;
            media = castSession.getMediaSession();
            if (media) {
              if (media.activeTrackIds.length && !subtitlesOn) {
                subtitlesOn = true;
                emitter.emit(CastEvent.SubtitlesOn, subtitlesOn);
              } else if (subtitlesOn) {
                subtitlesOn = false;
                emitter.emit(CastEvent.SubtitlesOn, subtitlesOn);
              }
            }
          } else if (typeof value !== "string") {
            emitter.emit(CastEvent.CurrentFile, "");
            emitter.emit(CastEvent.MetaData, undefined);
          }
        }
      );

      return { player, playerController };
    };
    if (initPromise) throw new Error("only call simpleCast.init once");
    try {
      initPromise = init(applicationId);
      await initPromise;
      return true;
    } catch (err) {
      console.log("failed to initialize chromecast", err);
      return false;
    }
  },
  currentDuration: async () => {
    const { player } = await getInitPromise();
    return player.duration;
  },
  isConnected: async () => {
    await getInitPromise();
    return (
      cast.framework.CastContext.getInstance().getCastState() ===
      cast.framework.CastState.CONNECTED
    );
  },
  currentFile: async () => {
    const mediaSession = await getMediaSession();
    return (mediaSession && mediaSession.media.contentId) || "";
  },
  currentMetaData: async () => {
    const mediaSession = await getMediaSession();
    if (mediaSession) return mediaSession.media.metadata;
  },
  subtitleStatus: async () => {
    const mediaSession = await getMediaSession();
    return Boolean(mediaSession && mediaSession.activeTrackIds.length);
  },
  isPlaying,
  connect,
  disconnect: async () => {
    await getInitPromise();
    await cast.framework.CastContext.getInstance().endCurrentSession(true);
  },
  send: async (
    file: string,
    time?: number,
    subtitleFile?: string,
    metaData?: object,
    queue = false
  ) => {
    const castSession = await connect();

    const mediaInfo = new chrome.cast.media.MediaInfo(
      // time ? `${file}#t=${time}` : file, // TODO: not working, going to have to seek to position for now.
      file,
      "video/mp4"
    );

    if (metaData) mediaInfo.metadata = metaData;
    if (subtitleFile) {
      const subtitle = new chrome.cast.media.Track(
        1,
        chrome.cast.media.TrackType.TEXT
      );
      subtitle.trackContentId = subtitleFile;
      subtitle.trackContentType = "text/vtt";
      subtitle.subtype = chrome.cast.media.TextTrackType.SUBTITLES;
      subtitle.name = "Subtitles";
      subtitle.language = "en-US";
      mediaInfo.tracks = [subtitle];
      mediaInfo.textTrackStyle = new chrome.cast.media.TextTrackStyle();
    }

    const media = castSession.getMediaSession();
    if (queue && media) {
      const queueItem = new chrome.cast.media.QueueItem(mediaInfo);
      if (subtitleFile) queueItem.activeTrackIds = [];
      await new Promise((resolve, reject) =>
        media.queueAppendItem(queueItem, resolve, reject)
      );
    } else {
      const loadRequest = new chrome.cast.media.LoadRequest(mediaInfo);
      if (subtitleFile) loadRequest.activeTrackIds = [];
      await castSession.loadMedia(loadRequest);
      // TODO: setting type with `t=` in url not working so this has to seek after load.
      if (time) {
        await seek(time);
      }
    }
  },
  play: async () => {
    const { playerController } = await getInitPromise();
    if (!(await isPlaying())) {
      playerController.playOrPause();
    }
  },
  pause: async () => {
    const { playerController } = await getInitPromise();
    if (await isPlaying()) {
      playerController.playOrPause();
    }
  },
  stop: async () => {
    const { playerController } = await getInitPromise();
    playerController.stop();
  },
  seek,
  setSubtitleActive: async (active: boolean) => {
    const mediaSession = await getMediaSession();
    const tracksInfoRequest = new chrome.cast.media.EditTracksInfoRequest(
      active ? [1] : []
    );
    mediaSession &&
      mediaSession.editTracksInfo(
        tracksInfoRequest,
        () => {},
        () => {}
      );
  },
};
