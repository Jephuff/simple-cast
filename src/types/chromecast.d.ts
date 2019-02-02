declare namespace ChromeCast {
  enum IdleReason {
    CANCELLED = "CANCELLED",
    INTERRUPTED = "INTERRUPTED",
    FINISHED = "FINISHED",
    ERROR = "ERROR",
  }
  enum RemotePlayerEventType {
    ANY_CHANGE = "anyChanged",
  }
  enum ErrorCode {}
  enum PlayerState {
    IDLE = "IDLE",
    PLAYING = "PLAYING",
    PAUSED = "PAUSED",
    BUFFERING = "BUFFERING",
  }
  enum TextTrackType {
    SUBTITLES = "SUBTITLES",
  }
  enum TrackType {
    TEXT = "TEXT",
  }
  interface RemotePlayer {
    currentTime: number;
    duration: number;
  }
  interface CastContext {
    getCurrentSession: () => CastSession | null;
    requestSession: () => Promise<ErrorCode | null>;
    setOptions: (options: CastOptions) => void;
  }
  interface CastOptions {
    receiverApplicationId: string;
  }
  interface CastSession {
    getMediaSession: () => Media | null;
    loadMedia: (loadRequest: LoadRequest) => Promise<ErrorCode | null>;
  }
  interface EditTracksInfoRequest {}
  interface LoadRequest {
    activeTrackIds: Array<number>;
  }
  interface CastError {}
  interface Media {
    editTracksInfo: (
      editTracksInfoRequest: EditTracksInfoRequest,
      successCallback: () => void,
      errorCallback: (error: CastError) => void
    ) => void;
    activeTrackIds: Array<number>;
    idleReason: null | IdleReason;
    media: MediaInfo;
    playerState: PlayerState;
  }
  interface MediaInfo {
    contentId: string;
    textTrackStyle?: TextTrackStyle;
    tracks: Array<Track>;
  }
  interface RemotePlayerChangedEvent {
    field: string;
    value: any;
  }
  interface RemotePlayerController {
    addEventListener: (
      type: RemotePlayerEventType,
      handler: (arg0: RemotePlayerChangedEvent) => void
    ) => void;
    playOrPause: () => void;
    seek: () => void;
    stop: () => void;
  }
  interface TextTrackStyle {}
  interface Track {
    language?: string;
    name?: string;
    subtype?: TextTrackType;
    trackContentId?: string;
    trackContentType?: string;
  }

  interface Cast {
    framework: {
      RemotePlayerEventType: typeof RemotePlayerEventType;
      CastContext: { getInstance: () => CastContext };
      RemotePlayer: { new (): RemotePlayer };
      RemotePlayerController: {
        new (player: RemotePlayer): RemotePlayerController;
      };
    };
  }

  interface Chrome {
    cast: {
      media: {
        IdleReason: typeof IdleReason;
        PlayerState: typeof PlayerState;
        DEFAULT_MEDIA_RECEIVER_APP_ID: string;
        EditTracksInfoRequest: {
          new (
            opt_activeTrackIds: number[],
            opt_textTrackStyle?: TextTrackStyle
          ): EditTracksInfoRequest;
        };
        LoadRequest: { new (mediaInfo: MediaInfo): LoadRequest };
        MediaInfo: {
          new (contentId: string, contentType: string): MediaInfo;
        };
        TextTrackStyle: { new (): TextTrackStyle };
        Track: { new (trackId: number, trackType: TrackType): Track };
        TrackType: typeof TrackType;
        TextTrackType: typeof TextTrackType;
      };
    };
  }

  type CastAvailableCallback = ((isAvailable: boolean) => void);
}

interface Window {
  cast?: ChromeCast.Cast;
  chrome?: ChromeCast.Chrome;
  __onGCastApiAvailable?: ChromeCast.CastAvailableCallback;
}
