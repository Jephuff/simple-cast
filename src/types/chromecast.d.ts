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
    //     canControlVolume: boolean;
    //     canPause: boolean;
    //     canSeek: boolean;
    //     controller: null | ControllerInterface;
    currentTime: number;
    //     displayName: string;
    //     displayStatus: string;
    duration: number;
    //     imageUrl: null | string;
    //     isConnected: boolean;
    //     isMediaLoaded: boolean;
    //     isMuted: boolean;
    //     isPaused: boolean;
    //     mediaInfo: null | MediaInfo;
    //     playerState: null | TPlayerState;
    //     savedPlayerState: null | {
    //       mediaInfo: null | TPlayerState;
    //       currentTime: number;
    //       isPaused: boolean;
    //     };
    //     statusText: string;
    //     title: null | string;
    //     volumeLevel: number;
  };
  //   type ControllerInterface = {};
  //   type TActiveInputStateEventData = {
  //     activeInputState: ActiveInputState;
  //   };

  //   type TDefaultActionPolicy = {
  //     CREATE_SESSION: 'create_session';
  //     CAST_THIS_TAB: 'cast_this_tab';
  //   };
  //   type TApiConfig = {
  //     autoJoinPolicy: TAutoJoinPolicy;
  //     defaultActionPolicy: TDefaultActionPolicy;
  //     receiverListener: (TReceiverAvailability: undefined) => void;
  //     sessionListener: (TSession: undefined) => void;
  //     sessionRequest: TSessionRequest;
  //   };
  //   type TApplicationMetadata = {
  //     applicationId: string;
  //     images: Array<TImage>;
  //     name: string;
  //     namespaces: Array<string>;
  //   };
  //   type TApplicationMetadataEventData = {
  //     metadata: TApplicationMetadata;
  //   };
  //   type TApplicationStatusEventData = {
  //     status: null | string;
  //   };
  //   type TCastContextEventType = {
  //     CAST_STATE_CHANGED: 'caststatechanged';
  //     SESSION_STATE_CHANGED: 'sessionstatechanged';
  //   };
  //   type TSessionState = {
  //     NO_SESSION: 'NO_SESSION';
  //     SESSION_ENDED: 'SESSION_ENDED';
  //     SESSION_ENDING: 'SESSION_ENDING';
  //     SESSION_RESUMED: 'SESSION_RESUMED';
  //     SESSION_STARTED: 'SESSION_STARTED';
  //     SESSION_STARTING: 'SESSION_STARTING';
  //     SESSION_START_FAILED: 'SESSION_START_FAILED';
  //   };

  type TCastContext = {
    //     addEventListener: (
    //       type: null | TCastContextEventType,
    //       handler: (arg0: TCastStateEventData | TSessionStateEventData) => void
    //     ) => void;
    endCurrentSession: (stopCasting: boolean) => void;
    getCastState: () => CastState;
    getCurrentSession: () => TCastSession | null;
    //     getSessionState: () => TSessionState;
    //     removeEventListener: (
    //       type: null | TCastContextEventType,
    //       handler: (arg0: TCastStateEventData | TSessionStateEventData) => void
    //     ) => void;
    requestSession: () => Promise<ErrorCode | null>;
    setOptions: (options: TCastOptions) => void;
  };
  type TCastOptions = {
    autoJoinPolicy?: AutoJoinPolicy;
    language?: string;
    receiverApplicationId: string;
    resumeSavedSession?: boolean;
  };
  //   type TSessionEventType = {
  //     APPLICATION_STATUS_CHANGED: 'applicationstatuschanged';
  //     APPLICATION_METADATA_CHANGED: 'applicationmetadatachanged';
  //     ACTIVE_INPUT_STATE_CHANGED: 'activeinputstatechanged';
  //     VOLUME_CHANGED: 'volumechanged';
  //     MEDIA_SESSION: 'mediasession';
  //   };
  type TCastSession = {
    //     addEventListener: (
    //       type: null | TSessionEventType,
    //       handler: (
    //         arg0:
    //           | TApplicationStatusEventData
    //           | TApplicationMetadataEventData
    //           | TActiveInputStateEventData
    //           | TMediaSessionEventData
    //           | TVolumeEventData
    //       ) => void
    //     ) => void;
    //     addMessageListener: (
    //       namespace: string,
    //       listener: (arg0: string, arg1: string) => void
    //     ) => void;
    //     endSession: (stopCasting: boolean) => void;
    //     getActiveInputState: () => ActiveInputState;
    //     getApplicationMetadata: () => TApplicationMetadata;
    //     getApplicationStatus: () => string;
    //     getCastDevice: () => TReceiver;
    getMediaSession: () => Media | null;
    //     getSessionId: () => string;
    //     getSessionObj: () => TSession;
    //     getSessionState: () => TSessionState;
    //     getVolume: () => number;
    //     isMute: () => boolean;
    loadMedia: (loadRequest: LoadRequest) => Promise<ErrorCode | null>;
    //     removeEventListener: (
    //       type: null | TSessionEventType,
    //       handler: (
    //         arg0:
    //           | TApplicationStatusEventData
    //           | TApplicationMetadataEventData
    //           | TActiveInputStateEventData
    //           | TMediaSessionEventData
    //           | TVolumeEventData
    //       ) => void
    //     ) => void;
    //     removeMessageListener: (
    //       namespace: string,
    //       listener: (arg0: string, arg1: string) => void
    //     ) => void;
    //     sendMessage: (
    //       namespace: string,
    //       data: object | string
    //     ) => Promise<ErrorCode | null>;
    //     setMute: (isMute: boolean) => Promise<ErrorCode | null>;
    //     setVolume: (volume: number) => Promise<ErrorCode | null>;
  };
  //   type TCastStateEventData = {
  //     castState: TCastState;
  //   };
  //   type TDialRequest = {
  //     appName: string;
  //     launchParameter: null | string;
  //   };
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
  //   type TEventData = {
  //     // type: TEventType;
  //   };
  //   type TGameManagerClient = {
  //     getInstanceFor: (
  //       session: null | TSession,
  //       successCallback: (arg0: TGameManagerInstanceResult) => void,
  //       errorCallback: (arg0: TGameManagerError) => void
  //     ) => void;
  //     // addEventListener: (
  //     //   type: TGameManagerEventType,
  //     //   listener: (arg0: TGameManagerEvent) => void
  //     // ) => void;
  //     dispose: () => void;
  //     getCurrentState: () => TGameManagerState;
  //     getLastUsedPlayerId: () => string;
  //     isDisposed: () => boolean;
  //     // removeEventListener: (
  //     //   type: TGameManagerEventType,
  //     //   listener: (arg0: TGameManagerEvent) => void
  //     // ) => void;
  //     sendGameMessage: (extraMessageData: undefined) => void;
  //     sendGameMessageWithPlayerId: (
  //       playerId: undefined,
  //       extraMessageData: undefined
  //     ) => void;
  //     sendGameRequest: (
  //       extraMessageData: undefined,
  //       successCallback: undefined,
  //       errorCallback: undefined
  //     ) => void;
  //     sendGameRequestWithPlayerId: (
  //       playerId: undefined,
  //       extraMessageData: undefined,
  //       successCallback: undefined,
  //       errorCallback: undefined
  //     ) => void;
  //     sendPlayerAvailableRequest: (
  //       extraMessageData: undefined,
  //       successCallback: undefined,
  //       errorCallback: undefined
  //     ) => void;
  //     sendPlayerAvailableRequestWithPlayerId: (
  //       playerId: undefined,
  //       extraMessageData: undefined,
  //       successCallback: undefined,
  //       errorCallback: undefined
  //     ) => void;
  //     sendPlayerIdleRequest: (
  //       extraMessageData: undefined,
  //       successCallback: undefined,
  //       errorCallback: undefined
  //     ) => void;
  //     sendPlayerIdleRequestWithPlayerId: (
  //       playerId: undefined,
  //       extraMessageData: undefined,
  //       successCallback: undefined,
  //       errorCallback: undefined
  //     ) => void;
  //     sendPlayerPlayingRequest: (
  //       extraMessageData: undefined,
  //       successCallback: undefined,
  //       errorCallback: undefined
  //     ) => void;
  //     sendPlayerPlayingRequestWithPlayerId: (
  //       playerId: undefined,
  //       extraMessageData: undefined,
  //       successCallback: undefined,
  //       errorCallback: undefined
  //     ) => void;
  //     sendPlayerQuitRequest: (
  //       extraMessageData: undefined,
  //       successCallback: undefined,
  //       errorCallback: undefined
  //     ) => void;
  //     sendPlayerQuitRequestWithPlayerId: (
  //       playerId: undefined,
  //       extraMessageData: undefined,
  //       successCallback: undefined,
  //       errorCallback: undefined
  //     ) => void;
  //     sendPlayerReadyRequest: (
  //       extraMessageData: undefined,
  //       successCallback: undefined,
  //       errorCallback: undefined
  //     ) => void;
  //     sendPlayerReadyRequestWithPlayerId: (
  //       playerId: undefined,
  //       extraMessageData: undefined,
  //       successCallback: undefined,
  //       errorCallback: undefined
  //     ) => void;
  //   };
  //   type TGameManagerError = {
  //     castError: TError;
  //     // errorCode: TGameManagerErrorCode;
  //     errorDescription: null | string;
  //     result: TGameManagerResult;
  //   };
  //   type TGameManagerGameMessageReceivedEvent = {
  //     gameMessage: object;
  //     playerId: string;
  //     // type: TGameManagerEventType;
  //   };
  //   type TGameManagerInstanceResult = {
  //     // gameManagerClient: TGameManagerClient;
  //   };
  //   type TGameManagerResult = {
  //     extraMessageData: object;
  //     playerId: string;
  //     requestId: number;
  //   };
  //   type TGameManagerState = {
  //     equals: (otherState: null | TGameManagerState) => boolean;
  //     getApplicationName: () => string;
  //     getConnectedControllablePlayers: () => Array<TPlayerInfo>;
  //     getConnectedPlayers: () => Array<TPlayerInfo>;
  //     getControllablePlayers: () => Array<TPlayerInfo>;
  //     getGameData: () => object;
  //     // getGameplayState: () => TGameplayState;
  //     getGameStatusText: () => string;
  //     getListOfChangedPlayers: (
  //       otherState: null | TGameManagerState
  //     ) => Array<string>;
  //     // getLobbyState: () => TLobbyState;
  //     getMaxPlayers: () => number;
  //     getPlayer: (playerId: string) => TPlayerInfo;
  //     getPlayers: () => Array<TPlayerInfo>;
  //     getPlayersInState: (playerState: TPlayerState) => Array<TPlayerInfo>;
  //     hasGameDataChanged: (otherState: null | TGameManagerState) => boolean;
  //     hasGameplayStateChanged: (otherState: null | TGameManagerState) => boolean;
  //     hasGameStatusTextChanged: (otherState: null | TGameManagerState) => boolean;
  //     hasLobbyStateChanged: (otherState: null | TGameManagerState) => boolean;
  //     hasPlayerChanged: (
  //       playerId: string,
  //       otherState: null | TGameManagerState
  //     ) => boolean;
  //     hasPlayerDataChanged: (
  //       playerId: string,
  //       otherState: null | TGameManagerState
  //     ) => boolean;
  //     hasPlayerStateChanged: (
  //       playerId: string,
  //       otherState: null | TGameManagerState
  //     ) => boolean;
  //   };
  //   type TGameManagerStateChangedEvent = {
  //     currentState: TGameManagerState;
  //     previousState: TGameManagerState;
  //     // type: TGameManagerEventType;
  //   };
  //   type TGenericMediaMetadata = {
  //     images: Array<TImage>;
  //     // metadataType: TMetadataType;
  //     releaseDate: null | string;
  //     releaseYear: null | number;
  //     subtitle: null | string;
  //     title: null | string;
  //     // type: TMetadataType;
  //   };
  //   type TGetStatusRequest = {
  //     customData: object;
  //   };
  //   type TImage = {
  //     height: null | number;
  //     url: string;
  //     width: null | number;
  //   };

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
    //     currentItemId: null | number;
    //     currentTime: number;
    //     customData: object;
    idleReason: null | IdleReason;
    //     items: null | Array<QueueItem>;
    //     loadingItemId: null | number;
    media: MediaInfo;
    //     mediaSessionId: number;
    //     playbackRate: number;
    playerState: PlayerState;
    //     preloadedItemId: null | number;
    //     // repeatMode: TRepeatMode;
    //     sessionId: string;
    //     // supportedMediaCommands: Array<TMediaCommand>;
    //     volume: TVolume;
    queueInsertItems: (
      queueInsertItemsRequest: QueueInsertItemsRequest,
      successCallback: () => void,
      errorCallback: (error: CastError) => void
    ) => void;
  }
  interface MediaInfo {
    // breakClips?: BreakClip[]
    // breaks?: Break[]
    contentId: string;
    contentType: string;
    contentUrl?: string
    customData: object;
    duration?: number;
    entity?: string
    // hlsSegmentFormat?: HlsSegmentFormat
    // hlsVideoSegmentFormat?: HlsVideoSegmentFormat
    metadata: any;
    // startAbsoluteTime?: number
    streamType: StreamType;
    textTrackStyle?: TextTrackStyle;
    tracks: Array<Track>;
    // userActionStates?: UserActionState[]
    // vmapAdsRequest?: VastAdsRequest
  }
  //   type TMediaSessionEventData = {
  //     mediaSession: TMedia;
  //   };
  //   type TMovieMediaMetadata = {
  //     images: Array<TImage>;
  //     // metadataType: TMetadataType;
  //     releaseDate: null | string;
  //     releaseYear: null | number;
  //     studio: null | string;
  //     subtitle: null | string;
  //     title: null | string;
  //     // type: TMetadataType;
  //   };
  //   type TMusicTrackMediaMetadata = {
  //     albumArtist: null | string;
  //     albumName: null | string;
  //     artist: null | string;
  //     artistName: null | string;
  //     composer: null | string;
  //     discNumber: null | number;
  //     images: Array<TImage>;
  //     // metadataType: TMetadataType;
  //     releaseDate: null | string;
  //     releaseYear: null | number;
  //     songName: null | string;
  //     title: null | string;
  //     trackNumber: null | number;
  //     // type: TMetadataType;
  //   };
  //   type TPauseRequest = {
  //     customData: object;
  //   };
  //   type TPhotoMediaMetadata = {
  //     artist: null | string;
  //     creationDateTime: null | string;
  //     height: null | number;
  //     images: Array<TImage>;
  //     latitude: null | number;
  //     location: null | string;
  //     longitude: null | number;
  //     // metadataType: TMetadataType;
  //     title: null | string;
  //     // type: TMetadataType;
  //     width: null | number;
  //   };
  //   type TPlayerInfo = {
  //     equals: (other: null | TPlayerInfo) => boolean;
  //     getPlayerData: () => Object;
  //     getPlayerId: () => string;
  //     getPlayerState: () => TPlayerState;
  //     isConnected: () => boolean;
  //     isControllable: () => boolean;
  //   };
  //   type TPlayRequest = {
  //     customData: object;
  //   };
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
  //   type TQueueLoadRequest = {
  //     customData: object;
  //     items: Array<QueueItem>;
  //     // repeatMode: TRepeatMode;
  //     startIndex: number;
  //   };
  //   type TQueueRemoveItemsRequest = {
  //     customData: object;
  //     itemIds: Array<number>;
  //   };
  //   type TQueueReorderItemsRequest = {
  //     customData: object;
  //     insertBefore: null | number;
  //     itemIds: Array<number>;
  //   };
  //   type TQueueUpdateItemsRequest = {
  //     customData: object;
  //     items: Array<QueueItem>;
  //   };
  //   type TReceiver = {
  //     // capabilities: Array<TCapability>;
  //     displayStatus: TReceiverDisplayStatus;
  //     friendlyName: string;
  //     isActiveInput: null | boolean;
  //     label: string;
  //     // receiverType: TReceiverType;
  //     volume: TVolume;
  //   };
  //   type TReceiverDisplayStatus = {
  //     appImages: Array<TImage>;
  //     showStop: null | boolean;
  //     statusText: string;
  //   };
  type RemotePlayerChangedEvent = {
    field: string;
    value: any;
  };
  type RemotePlayerController = {
    addEventListener: (
      type: RemotePlayerEventType,
      handler: (arg0: RemotePlayerChangedEvent) => void
    ) => void;
    //     getFormattedTime: (timeInSec: number) => void;
    //     getSeekPosition: (currentTime: number, duration: number) => number;
    //     getSeekTime: (currentPosition: number, duration: number) => number;
    //     muteOrUnmute: () => void;
    playOrPause: () => void;
    //     // removeEventListener: (
    //     //   type: null | RemotePlayerEventType,
    //     //   handler: (arg0: RemotePlayerChangedEvent) => void
    //     // ) => void;
    seek: () => void;
    //     setVolumeLevel: () => void;
    stop: () => void;
  };
  //   type TSeekRequest = {
  //     currentTime: null | number;
  //     customData: object;
  //     // resumeState: null | TResumeState;
  //   };
  //   type TSenderApplication = {
  //     packageId: null | string;
  //     // platform: TSenderPlatform;
  //     url: null | string;
  //   };
  //   type TSession = {
  //     appId: string;
  //     appImages: Array<TImage>;
  //     displayName: string;
  //     media: Array<TMedia>;
  //     namespaces: Array<{ name: string }>;
  //     receiver: TReceiver;
  //     senderApps: Array<TSenderApplication>;
  //     sessionId: string;
  //     // status: TSessionStatus;
  //     statusText: null | string;
  //     transportId: string;
  //   };
  //   type TSessionRequest = {
  //     appId: string;
  //     // capabilities: Array<TCapability>;
  //     language: null | string;
  //     requestSessionTimeout: number;
  //   };
  //   type TSessionStateEventData = {
  //     errorCode: null | ErrorCode;
  //     session: null | TCastSession;
  //     sessionState: TSessionState;
  //   };
  //   type TStopRequest = {
  //     customData: object;
  //   };
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
  //   type TTimeout = {
  //     leaveSession: number;
  //     requestSession: number;
  //     sendCustomMessage: number;
  //     setReceiverVolume: number;
  //     stopSession: number;
  //   };
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
  //   type TTvShowMediaMetadata = {
  //     episode: null | number;
  //     episodeNumber: null | number;
  //     episodeTitle: null | string;
  //     images: Array<TImage>;
  //     // metadataType: TMetadataType;
  //     originalAirdate: null | string;
  //     releaseYear: null | number;
  //     season: null | number;
  //     seasonNumber: null | number;
  //     seriesTitle: null | string;
  //     title: null | string;
  //     // type: TMetadataType;
  //   };
  //   type TVolume = {
  //     // controlType: TVolumeControlType;
  //     level: null | number;
  //     muted: null | boolean;
  //     stepInterval: number;
  //   };
  //   type TVolumeEventData = {
  //     isMute: null | boolean;
  //     volume: null | number;
  //   };
  //   type TVolumeRequest = {
  //     customData: object;
  //     volume: TVolume;
  //   };

  interface Cast {
    framework: {
      VERSION: string;
      LoggerLevel: typeof LoggerLevel;
      CastState: typeof CastState;
      // SessionState;
      // CastContextEventType;
      // SessionEventType;
      RemotePlayerEventType: typeof RemotePlayerEventType;
      ActiveInputState: typeof ActiveInputState;
      setLoggerLevel: (level: LoggerLevel) => void;
      // EventData: { new (type: null | TEventType): TEventData };
      // ActiveInputStateEventData: {
      //   new (
      //     activeInputState: null | ActiveInputState
      //   ): TActiveInputStateEventData;
      // };
      // ApplicationMetadata: {
      //   new (sessionObj: null | TSession): TApplicationMetadata;
      // };
      // ApplicationMetadataEventData: {
      //   new (
      //     metadata: null | TApplicationMetadata
      //   ): TApplicationMetadataEventData;
      // };
      // ApplicationStatusEventData: {
      //   new (status: string): TApplicationStatusEventData;
      // };
      // CastOptions: { new (opt_options: null | Optional): TCastOptions };
      // MediaSessionEventData: {
      //   new (mediaSession: null | TMedia): TMediaSessionEventData;
      // };
      // VolumeEventData: {
      //   new (volume: number, isMute: boolean): TVolumeEventData;
      // };
      // CastSession: {
      //   new (
      //     sessionObj: null | TSession,
      //     state: null | TSessionState
      //   ): TCastSession;
      // };
      // CastStateEventData: {
      //   new (castState: null | TCastState): TCastStateEventData;
      // };
      // SessionStateEventData: {
      //   new (
      //     session: TCastSession,
      //     sessionState: null | TSessionState,
      //     opt_errorCode: null | Optional
      //   ): TSessionStateEventData;
      // };
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
      //       ApiConfig: {
      //         new (
      //           sessionRequest: undefined,
      //           sessionListener: undefined,
      //           receiverListener: undefined,
      //           opt_autoJoinPolicy: undefined,
      //           opt_defaultActionPolicy: undefined
      //         ): TApiConfig;
      //       };
      //       DialRequest: {
      //         new (appName: undefined, opt_launchParameter: undefined): TDialRequest;
      //       };
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
        //         GenericMediaMetadata: { new (): TGenericMediaMetadata };
        //         GetStatusRequest: { new (): TGetStatusRequest };
        LoadRequest: { new (mediaInfo: MediaInfo): LoadRequest };
        //         Media: {
        //           new (sessionId: undefined, mediaSessionId: undefined): TMedia;
        //         };
        MediaInfo: {
          new (contentId: string, contentType: string): MediaInfo;
        };
        //         MovieMediaMetadata: { new (): TMovieMediaMetadata };
        //         MusicTrackMediaMetadata: { new (): TMusicTrackMediaMetadata };
        //         PauseRequest: { new (): TPauseRequest };
        //         PhotoMediaMetadata: { new (): TPhotoMediaMetadata };
        //         PlayRequest: { new (): TPlayRequest };
        QueueInsertItemsRequest: {
          new (
            itemsToInsert: (QueueItem & { itemId: undefined })[]
          ): QueueInsertItemsRequest;
        };
        QueueItem: {
          new (mediaInfo: MediaInfo): QueueItem & { itemId: undefined };
        };
        //         QueueLoadRequest: { new (items: undefined): TQueueLoadRequest };
        //         QueueRemoveItemsRequest: {
        //           new (itemIdsToRemove: undefined): TQueueRemoveItemsRequest;
        //         };
        //         QueueReorderItemsRequest: {
        //           new (itemIdsToReorder: undefined): TQueueReorderItemsRequest;
        //         };
        //         QueueUpdateItemsRequest: {
        //           new (itemsToUpdate: undefined): TQueueUpdateItemsRequest;
        //         };
        //         SeekRequest: { new (): TSeekRequest };
        //         StopRequest: { new (): TStopRequest };
        TextTrackStyle: { new (): TextTrackStyle };
        Track: { new (trackId: number, trackType: TrackType): Track };
        TrackType: typeof TrackType;
        TextTrackType: typeof TextTrackType;
        //         TvShowMediaMetadata: { new (): TTvShowMediaMetadata };
        //         VolumeRequest: { new (volume: undefined): TVolumeRequest };
      };
      //       Error: {
      //         new (
      //           code: undefined,
      //           opt_description: undefined,
      //           opt_details: undefined
      //         ): TError;
      //       };
      //       games: {
      //         GameManagerClient: { new (session: undefined): TGameManagerClient };
      //         GameManagerError: {
      //           new (
      //             errorCode: undefined,
      //             errorDescription: undefined,
      //             result: undefined,
      //             castError: undefined
      //           ): TGameManagerError;
      //         };
      //         GameManagerGameMessageReceivedEvent: {
      //           new (
      //             playerId: undefined,
      //             gameMessage: undefined
      //           ): TGameManagerGameMessageReceivedEvent;
      //         };
      //         GameManagerInstanceResult: {
      //           new (gameManagerClient: undefined): TGameManagerInstanceResult;
      //         };
      //         GameManagerResult: {
      //           new (
      //             playerId: undefined,
      //             requestId: undefined,
      //             extraMessageData: undefined
      //           ): TGameManagerResult;
      //         };
      //         GameManagerState: {
      //           new (
      //             applicationName: undefined,
      //             maxPlayers: undefined,
      //             lobbyState: undefined,
      //             gameplayState: undefined,
      //             gameData: undefined,
      //             gameStatusText: undefined,
      //             players: undefined
      //           ): TGameManagerState;
      //         };
      //         GameManagerStateChangedEvent: {
      //           new (
      //             currentState: undefined,
      //             previousState: undefined
      //           ): TGameManagerStateChangedEvent;
      //         };
      //         PlayerInfo: {
      //           new (
      //             playerId: undefined,
      //             playerState: undefined,
      //             playerData: undefined,
      //             isControllable: undefined
      //           ): TPlayerInfo;
      //         };
      //       };
      //       Image: { new (url: undefined): TImage };
      //       Receiver: {
      //         new (
      //           label: undefined,
      //           friendlyName: undefined,
      //           opt_capabilities: undefined,
      //           opt_volume: undefined
      //         ): TReceiver;
      //       };
      //       ReceiverDisplayStatus: {
      //         new (
      //           statusText: undefined,
      //           appImages: undefined
      //         ): TReceiverDisplayStatus;
      //       };
      //       SenderApplication: { new (platform: undefined): TSenderApplication };
      //       Session: {
      //         new (
      //           sessionId: undefined,
      //           appId: undefined,
      //           displayName: undefined,
      //           appImages: undefined,
      //           receiver: undefined
      //         ): TSession;
      //       };
      //       SessionRequest: {
      //         new (
      //           appId: undefined,
      //           opt_capabilities: undefined,
      //           opt_timeout: undefined
      //         ): TSessionRequest;
      //       };
      //       Timeout: { new (): TTimeout };
      //       Volume: { new (opt_level: undefined, opt_muted: undefined): TVolume };
    };
  }

  type CastAvailableCallback = (isAvailable: boolean) => void;
}

interface Window {
  cast?: ChromeCast.Cast;
  chrome?: ChromeCast.Chrome;
  __onGCastApiAvailable?: ChromeCast.CastAvailableCallback;
}
