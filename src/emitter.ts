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
      | CastEvent.SubtitlesOn,
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
    ): void;
  };
} = new EventEmitter();

export default emitter;
