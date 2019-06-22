import EventEmitter from "eventemitter3";
import loadScript from "./loadScript";

enum CastEvent {
  Progress = "PROGRESS",
  Duration = "DURATION",
  Finished = "FINISHED",
  CurrentFile = "CURRENT_FILE",
  Playing = "PLAYING",
  SubtitlesOn = "SUBTITLES_ON",
  Connected = "CONNECTED",
  MetaData = "METADATA",
}

interface Listener {
  (
    event: CastEvent.CurrentFile | CastEvent.Finished,
    callback: (data: string) => void
  ): void;
  (event: CastEvent.MetaData, callback: (data?: unknown) => void): void;
  (
    event: CastEvent.Progress | CastEvent.Duration,
    callback: (data: number) => void
  ): void;
  (
    event: CastEvent.Playing | CastEvent.Connected | CastEvent.SubtitlesOn,
    callback: (data: boolean) => void
  ): void;
}

const emitter: {
  on: Listener;
  off: Listener;
  emit: {
    (event: CastEvent.Progress | CastEvent.Duration, data: number): void;
    (
      event: CastEvent.Playing | CastEvent.SubtitlesOn | CastEvent.Connected,
      data: boolean
    ): void;
    (event: CastEvent.CurrentFile | CastEvent.Finished, data: string): void;
    (event: CastEvent.MetaData, data?: unknown): void;
  };
} = new EventEmitter<CastEvent>();

let initPromise: Promise<{
  player: ChromeCast.RemotePlayer;
  playerController: ChromeCast.RemotePlayerController;
  cast: ChromeCast.Cast;
  chrome: ChromeCast.Chrome;
}> | null = null;

const getInitPromise = async () => {
  if (!initPromise) {
    throw new Error("must call `simpleCast.init()` before using any methods");
  }
  try {
    return await initPromise;
  } catch (err) {
    throw new Error("simpleCast.init() failed, chromecast unavailable");
  }
};

const isPlaying = async () => {
  const { chrome, cast } = await getInitPromise();
  const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
  const mediaSession = castSession && castSession.getMediaSession();
  const playerState = mediaSession && mediaSession.playerState;
  return playerState === chrome.cast.media.PlayerState.PLAYING;
};

const hasContentId = (
  obj: any
): obj is { contentId: string; metadata: unknown } => {
  return obj && obj.contentId;
};

const connect = async () => {
  const { cast } = await getInitPromise();

  const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
  if (castSession) {
    return castSession;
  } else {
    await cast.framework.CastContext.getInstance().requestSession();
    return cast.framework.CastContext.getInstance().getCurrentSession();
  }
};

export default {
  CastEvent,
  on: emitter.on.bind(emitter) as Listener,
  off: emitter.off.bind(emitter) as Listener,
  init: async (applicationId?: string) => {
    const init = async (applicationId?: string) => {
      await loadScript();
      if (!window.chrome || !window.cast) {
        throw new Error();
      }
      window.cast.framework.CastContext.getInstance().setOptions({
        receiverApplicationId:
          applicationId ||
          window.chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
      });

      const player = new window.cast.framework.RemotePlayer();
      const playerController = new window.cast.framework.RemotePlayerController(
        player
      );
      let media: ChromeCast.Media | null;
      let subtitlesOn = false;
      playerController.addEventListener(
        window.cast.framework.RemotePlayerEventType.ANY_CHANGE,
        ({
          field,
          value,
        }: {
          field: string;
          value?: number | string | { contentId: string } | boolean;
        }): void => {
          switch (field) {
            case "isConnected":
              emitter.emit(CastEvent.Connected, !!value);
              break;
            case "currentTime":
              if (typeof value === "number") {
                emitter.emit(CastEvent.Progress, value);
              }
              break;
            case "duration":
              if (typeof value === "number") {
                emitter.emit(CastEvent.Duration, value);
              }
              break;
            case "playerState":
              if (!window.chrome) break;
              if (value === window.chrome.cast.media.PlayerState.PLAYING) {
                emitter.emit(CastEvent.Playing, true);
              } else if (
                value === window.chrome.cast.media.PlayerState.PAUSED
              ) {
                emitter.emit(CastEvent.Playing, false);
              }
            case "mediaInfo":
              if (hasContentId(value)) {
                emitter.emit(CastEvent.CurrentFile, value.contentId);
                emitter.emit(CastEvent.MetaData, value.metadata);
                const castSession =
                  window.cast &&
                  window.cast.framework.CastContext.getInstance().getCurrentSession();
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
                emitter.emit(CastEvent.MetaData);
                if (
                  media &&
                  media.idleReason ===
                    (window.chrome &&
                      window.chrome.cast.media.IdleReason.FINISHED)
                ) {
                  emitter.emit(CastEvent.Finished, media.media.contentId);
                  emitter.emit(CastEvent.MetaData, media.media.metadata);
                  media = null;
                }
              }
              return;
          }
        }
      );

      return {
        player,
        playerController,
        cast: window.cast,
        chrome: window.chrome,
      };
    };
    try {
      if (initPromise) throw new Error("only call simpleCast.init once");
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
    const { cast } = await getInitPromise();
    return (
      cast.framework.CastContext.getInstance().getCastState() ===
      cast.framework.CastState.CONNECTED
    );
  },
  currentFile: async () => {
    const { cast } = await getInitPromise();
    const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
    const mediaSession = castSession && castSession.getMediaSession();
    return (mediaSession && mediaSession.media.contentId) || "";
  },
  currentMetaData: async () => {
    const { cast } = await getInitPromise();
    const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
    const mediaSession = castSession && castSession.getMediaSession();
    return mediaSession && (mediaSession.media.metadata as unknown);
  },
  subtitleStatus: async () => {
    const { cast } = await getInitPromise();
    const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
    const mediaSession = castSession && castSession.getMediaSession();
    return Boolean(mediaSession && mediaSession.activeTrackIds.length);
  },
  isPlaying,
  connect: async () => {
    await connect();
  },
  disconnect: async () => {
    const { cast } = await getInitPromise();
    const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
    if (castSession) {
      await cast.framework.CastContext.getInstance().endCurrentSession(true);
    }
  },
  send: async (
    file: string,
    time?: number,
    subtitleFile?: string,
    metaData?: object
  ) => {
    const { chrome } = await getInitPromise();
    const mediaInfo = new chrome.cast.media.MediaInfo(
      time ? `${file}#t=${time}` : file,
      "video/mp4"
    );
    mediaInfo.metadata = metaData;
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

    const loadRequest = new chrome.cast.media.LoadRequest(mediaInfo);

    if (subtitleFile && loadRequest) {
      loadRequest.activeTrackIds = [];
    }

    const castSession = await connect();
    if (!castSession) return;
    loadRequest && (await castSession.loadMedia(loadRequest));
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
  seek: async (time: number) => {
    const { playerController, player } = await getInitPromise();
    player.currentTime = Math.floor(time);
    playerController.seek();
  },
  setSubtitleActive: async (active: boolean) => {
    const { chrome, cast } = await getInitPromise();
    const tracksInfoRequest = new chrome.cast.media.EditTracksInfoRequest(
      active ? [1] : []
    );
    const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
    const mediaSession = castSession && castSession.getMediaSession();
    mediaSession &&
      mediaSession.editTracksInfo(tracksInfoRequest, () => {}, () => {});
  },
};
