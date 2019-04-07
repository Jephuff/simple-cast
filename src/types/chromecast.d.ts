declare namespace ChromeCast {
  enum IdleReason {
    CANCELLED = "CANCELLED",
    INTERRUPTED = "INTERRUPTED",
    FINISHED = "FINISHED",
    ERROR = "ERROR",
  }
  enum LoggerLevel {
    DEBUG = 0,
    INFO = 800,
    WARNING = 900,
    ERROR = 1000,
    NONE = 1500,
  }
  enum RemotePlayerEventType {
    ANY_CHANGE = "anyChanged",
    CAN_CONTROL_VOLUME_CHANGED = "canControlVolumeChanged",
    CAN_PAUSE_CHANGED = "canPauseChanged",
    CAN_SEEK_CHANGED = "canSeekChanged",
    CURRENT_TIME_CHANGED = "currentTimeChanged",
    DISPLAY_NAME_CHANGED = "displayNameChanged",
    DISPLAY_STATUS_CHANGED = "displayStatusChanged",
    DURATION_CHANGED = "durationChanged",
    IMAGE_URL_CHANGED = "imageUrlChanged",
    IS_CONNECTED_CHANGED = "isConnectedChanged",
    IS_MEDIA_LOADED_CHANGED = "isMediaLoadedChanged",
    IS_MUTED_CHANGED = "isMutedChanged",
    IS_PAUSED_CHANGED = "isPausedChanged",
    MEDIA_INFO_CHANGED = "mediaInfoChanged",
    PLAYER_STATE_CHANGED = "playerStateChanged",
    STATUS_TEXT_CHANGED = "statusTextChanged",
    TITLE_CHANGED = "titleChanged",
    VOLUME_LEVEL_CHANGED = "volumeLevelChanged",
  }
  enum ErrorCode {
    API_NOT_INITIALIZED = "api_not_initialized",
    CANCEL = "cancel",
    CHANNEL_ERROR = "channel_error",
    EXTENSION_MISSING = "extension_missing",
    EXTENSION_NOT_COMPATIBLE = "extension_not_compatible",
    INVALID_PARAMETER = "invalid_parameter",
    LOAD_MEDIA_FAILED = "load_media_failed",
    RECEIVER_UNAVAILABLE = "receiver_unavailable",
    SESSION_ERROR = "session_error",
    TIMEOUT = "timeout",
  }
  enum AutoJoinPolicy {
    CUSTOM_CONTROLLER_SCOPED = "custom_controller_scoped",
    TAB_AND_ORIGIN_SCOPED = "tab_and_origin_scoped",
    ORIGIN_SCOPED = "origin_scoped",
    PAGE_SCOPED = "page_scoped",
  }
  enum PlayerState {
    IDLE = "IDLE",
    PLAYING = "PLAYING",
    PAUSED = "PAUSED",
    BUFFERING = "BUFFERING",
  }
  enum ActiveInputState {
    ACTIVE_INPUT_STATE_UNKNOWN = -1,
    ACTIVE_INPUT_STATE_NO = 0,
    ACTIVE_INPUT_STATE_YES = 1,
  }
  enum TextTrackType {
    CAPTIONS = "CAPTIONS",
    CHAPTERS = "CHAPTERS",
    DESCRIPTIONS = "DESCRIPTIONS",
    METADATA = "METADATA",
    SUBTITLES = "SUBTITLES",
  }
  enum TrackType {
    TEXT = "TEXT",
    AUDIO = "AUDIO",
    VIDEO = "VIDEO",
  }
  enum TextTrackEdgeType {
    DEPRESSED = "DEPRESSED",
    DROP_SHADOW = "DROP_SHADOW",
    NONE = "NONE",
    OUTLINE = "OUTLINE",
    RAISED = "RAISED",
  }
  enum TextTrackFontGenericFamily {
    CASUAL = "CASUAL",
    CURSIVE = "CURSIVE",
    MONOSPACED_SANS_SERIF = "MONOSPACED_SANS_SERIF",
    MONOSPACED_SERIF = "MONOSPACED_SERIF",
    SANS_SERIF = "SANS_SERIF",
    SERIF = "SERIF",
    SMALL_CAPITALS = "SMALL_CAPITALS",
  }
  enum TextTrackFontStyle {
    BOLD = "BOLD",
    BOLD_ITALIC = "BOLD_ITALIC",
    ITALIC = "ITALIC",
    NORMAL = "NORMAL",
  }
  enum TextTrackWindowType {
    NONE = "NONE",
    NORMAL = "NORMAL",
    ROUNDED_CORNERS = "ROUNDED_CORNERS",
  }
  enum StreamType {
    BUFFERED = "BUFFERED",
    LIVE = "LIVE",
    OTHER = "OTHER",
  }
  enum CastState {
    NO_DEVICES_AVAILABLE = "NO_DEVICES_AVAILABLE",
    NOT_CONNECTED = "NOT_CONNECTED",
    CONNECTING = "CONNECTING",
    CONNECTED = "CONNECTED",
  }
  type RemotePlayer = {
    currentTime: number;
    duration: number;
  };

  type TCastContext = {
    getCastState: () => CastState;
    getCurrentSession: () => TCastSession | null;
    requestSession: () => Promise<ErrorCode | null>;
    setOptions: (options: TCastOptions) => void;
  };
  type TCastOptions = {
    autoJoinPolicy?: AutoJoinPolicy;
    language?: string;
    receiverApplicationId: string;
    resumeSavedSession?: boolean;
  };
  type TCastSession = {
    getMediaSession: () => Media | null;
    loadMedia: (loadRequest: LoadRequest) => Promise<ErrorCode | null>;
  };
  interface EditTracksInfoRequest {
    activeTrackIds: number[];
    requestId: number;
    textTrackStyle?: TextTrackStyle;
  }
  type CastError = {
    code: ErrorCode;
    description: null | string;
    details: object;
  };

  interface LoadRequest {
    activeTrackIds: Array<number>;
    autoplay: boolean;
    currentTime?: number;
    customData: object;
    media: MediaInfo;
    requestId: number;
    sessionId?: string;
    type: string;
  }
  type TError = {
    code: ErrorCode;
    description?: string;
    details: object;
  };
  interface Media {
    editTracksInfo: (
      editTracksInfoRequest: EditTracksInfoRequest,
      successCallback: () => void,
      errorCallback: (error: TError) => void
    ) => void;
    activeTrackIds: Array<number>;
    idleReason: null | IdleReason;
    media: MediaInfo;
    playerState: PlayerState;
    queueInsertItems: (
      queueInsertItemsRequest: QueueInsertItemsRequest,
      successCallback: () => void,
      errorCallback: (error: CastError) => void
    ) => void;
  }
  interface MediaInfo {
    contentId: string;
    contentType: string;
    customData: object;
    duration?: number;
    metadata: any;
    streamType: StreamType;
    textTrackStyle?: TextTrackStyle;
    tracks: Array<Track>;
  }
  interface QueueInsertItemsRequest {
    customData: {};
    insertBefore: null | number;
    items: Array<QueueItem>;
  }
  interface QueueItem {
    activeTrackIds: Array<number>;
    autoplay: boolean;
    customData: {};
    itemId?: null | number;
    media: MediaInfo;
    playbackDuration: null | number;
    preloadTime: number;
    startTime: number;
  }
  type RemotePlayerChangedEvent = {
    field: string;
    value: any;
  };
  type RemotePlayerController = {
    addEventListener: (
      type: RemotePlayerEventType,
      handler: (arg0: RemotePlayerChangedEvent) => void
    ) => void;
    playOrPause: () => void;
    seek: () => void;
    stop: () => void;
  };
  type TextTrackStyle = {
    backgroundColor?: string;
    customData: object;
    edgeColor?: string;
    edgeType?: TextTrackEdgeType;
    fontFamily?: string;
    fontGenericFamily?: TextTrackFontGenericFamily;
    fontScale?: number;
    fontStyle?: TextTrackFontStyle;
    foregroundColor?: string;
    windowColor?: string;
    windowRoundedCornerRadius?: number;
    windowType?: TextTrackWindowType;
  };
  interface Track {
    customData: object;
    language?: string; // Language tag as per RFC 5646. Mandatory when the subtype is SUBTITLES.
    name?: string;
    subtype?: TextTrackType;
    trackContentId?: string;
    trackContentType?: string;
    trackId: number;
    type: TrackType;
  }

  interface Cast {
    framework: {
      VERSION: string;
      LoggerLevel: typeof LoggerLevel;
      CastState: typeof CastState;

      RemotePlayerEventType: typeof RemotePlayerEventType;
      ActiveInputState: typeof ActiveInputState;
      setLoggerLevel: (level: LoggerLevel) => void;
      CastContext: { getInstance: () => TCastContext };
      RemotePlayer: { new (): RemotePlayer };
      RemotePlayerChangedEvent: {
        new (
          type: RemotePlayerEventType,
          field: string,
          value: any
        ): RemotePlayerChangedEvent;
      };
      RemotePlayerController: {
        new (player: RemotePlayer): RemotePlayerController;
      };
    };
  }

  interface Chrome {
    cast: {
      ErrorCode: typeof ErrorCode;
      AutoJoinPolicy: typeof AutoJoinPolicy;
      media: {
        IdleReason: typeof IdleReason;
        PlayerState: typeof PlayerState;
        DEFAULT_MEDIA_RECEIVER_APP_ID: string;
        TextTrackEdgeType: typeof TextTrackEdgeType;
        TextTrackFontGenericFamily: typeof TextTrackFontGenericFamily;
        TextTrackFontStyle: typeof TextTrackFontStyle;
        TextTrackWindowType: typeof TextTrackWindowType;
        StreamType: typeof StreamType;
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
        QueueInsertItemsRequest: {
          new (
            itemsToInsert: (QueueItem & { itemId: undefined })[]
          ): QueueInsertItemsRequest;
        };
        QueueItem: {
          new (mediaInfo: MediaInfo): QueueItem & { itemId: undefined };
        };
        TextTrackStyle: { new (): TextTrackStyle };
        Track: { new (trackId: number, trackType: TrackType): Track };
        TrackType: typeof TrackType;
        TextTrackType: typeof TextTrackType;
      };
    };
  }

  type CastAvailableCallback = (isAvailable: boolean) => void;
}

interface Window {
  cast?: ChromeCast.Cast;
  chrome?: ChromeCast.Chrome;
  __onGCastApiAvailable?: ChromeCast.CastAvailableCallback;
}
