import emitter, { Listener, CastEvent } from "./emitter";
import loadScript from "./loadScript";

let initPromise: Promise<{
  player: ChromeCast.RemotePlayer;
  playerController: ChromeCast.RemotePlayerController;
  cast: ChromeCast.Cast;
  chrome: ChromeCast.Chrome;
}>;
const init = async () => {
  initPromise =
    initPromise ||
    (async () => {
      await loadScript();
      if (!window.chrome || !window.cast) {
        throw new Error();
      }
      window.cast.framework.CastContext.getInstance().setOptions({
        receiverApplicationId:
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
          value?: number | string | { contentId: string };
        }): void => {
          switch (field) {
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
                emitter.emit(CastEvent.Playing);
              } else if (
                value === window.chrome.cast.media.PlayerState.PAUSED
              ) {
                emitter.emit(CastEvent.Paused);
              }
            case "mediaInfo":
              if (hasContentId(value)) {
                emitter.emit(CastEvent.CurrentFile, value.contentId);
                const castSession =
                  window.cast &&
                  window.cast.framework.CastContext.getInstance().getCurrentSession();
                if (!castSession) return;
                media = castSession.getMediaSession();
                if (media) {
                  if (media.activeTrackIds.length && !subtitlesOn) {
                    subtitlesOn = true;
                    emitter.emit(CastEvent.SubtitlesOn);
                  } else if (subtitlesOn) {
                    subtitlesOn = false;
                    emitter.emit(CastEvent.SubtitlesOff);
                  }
                }
              } else {
                emitter.emit(CastEvent.CurrentFile, "");
                if (
                  media &&
                  media.idleReason ===
                    (window.chrome &&
                      window.chrome.cast.media.IdleReason.FINISHED)
                ) {
                  emitter.emit(CastEvent.Finished, media.media.contentId);
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
    })();
  return initPromise;
};

const isPlaying = async () => {
  const { chrome, cast } = await init();
  const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
  const mediaSession = castSession && castSession.getMediaSession();
  const playerState = mediaSession && mediaSession.playerState;
  return playerState === chrome.cast.media.PlayerState.PLAYING;
};

const hasContentId = (obj: any): obj is { contentId: string } => {
  return obj && obj.contentId;
};

export default {
  CastEvent,
  on: emitter.on.bind(emitter) as Listener,
  off: emitter.off.bind(emitter) as Listener,
  init: async () => {
    await init();
  },

  currentDuration: async () => {
    const { player } = await init();
    return player.duration;
  },
  currentFile: async () => {
    const { cast } = await init();
    const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
    const mediaSession = castSession && castSession.getMediaSession();
    return (mediaSession && mediaSession.media.contentId) || "";
  },
  subtitleStatus: async () => {
    const { cast } = await init();
    const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
    const mediaSession = castSession && castSession.getMediaSession();
    return Boolean(mediaSession && mediaSession.activeTrackIds.length);
  },
  isPlaying,

  send: async (file: string, time?: number, subtitleFile?: string) => {
    const { chrome, cast } = await init();
    const mediaInfo = new chrome.cast.media.MediaInfo(
      time ? `${file}#t=${time}` : file,
      "video/mp4"
    );
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

    let castSession = cast.framework.CastContext.getInstance().getCurrentSession();
    if (!castSession) {
      await cast.framework.CastContext.getInstance().requestSession();
      castSession = cast.framework.CastContext.getInstance().getCurrentSession();
    }

    if (!castSession) return;
    loadRequest && (await castSession.loadMedia(loadRequest));
  },
  play: async () => {
    const { playerController } = await init();
    if (!(await isPlaying())) {
      playerController.playOrPause();
    }
  },
  pause: async () => {
    const { playerController } = await init();
    if (await isPlaying()) {
      playerController.playOrPause();
    }
  },
  stop: async () => {
    const { playerController } = await init();
    playerController.stop();
  },
  seek: async (time: number) => {
    const { playerController, player } = await init();
    player.currentTime = Math.floor(time);
    playerController.seek();
  },
  setSubtitleActive: async (active: boolean) => {
    const { chrome, cast } = await init();
    const tracksInfoRequest = new chrome.cast.media.EditTracksInfoRequest(
      active ? [1] : []
    );
    const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
    const mediaSession = castSession && castSession.getMediaSession();
    mediaSession &&
      mediaSession.editTracksInfo(tracksInfoRequest, () => {}, () => {});
  },
};
