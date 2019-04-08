import EventEmitter from "eventemitter3";

export enum CastEvent {
  Progress = "PROGRESS",
  Duration = "DURATION",
  Finished = "FINISHED",
  CurrentFile = "CURRENT_FILE",
  Playing = "PLAYING",
  Paused = "PAUSED",
  SubtitlesOn = "SUBTITLES_ON",
  SubtitlesOff = "SUBTITLES_OFF",
  Connected = "CONNECTED",
  Disconnected = "DISCONNECTED",
}

export interface Listener {
  (
    event: CastEvent.CurrentFile | CastEvent.Finished,
    callback: (data: string) => void
  ): void;
  (
    event: CastEvent.Progress | CastEvent.Duration,
    callback: (data: number) => void
  ): void;
  (
    event:
      | CastEvent.Playing
      | CastEvent.Paused
      | CastEvent.SubtitlesOff
      | CastEvent.SubtitlesOn
      | CastEvent.Connected
      | CastEvent.Disconnected,
    callback: () => void
  ): void;
}

const emitter: {
  on: Listener;
  off: Listener;
  emit: {
    (event: CastEvent.Progress | CastEvent.Duration, data: number): void;
    (event: CastEvent.CurrentFile | CastEvent.Finished, data: string): void;
    (
      event:
        | CastEvent.Playing
        | CastEvent.Paused
        | CastEvent.SubtitlesOff
        | CastEvent.SubtitlesOn
        | CastEvent.Connected
        | CastEvent.Disconnected
    ): void;
  };
} = new EventEmitter.EventEmitter();

export default emitter;
