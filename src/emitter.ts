import EventEmitter from "eventemitter3";

export enum CastEvent {
  Progress = "PROGRESS",
  Duration = "DURATION",
  Finished = "FINISHED",
  CurrentFile = "CURRENT_FILE",
  Playing = "PLAYING",
  SubtitlesOn = "SUBTITLES_ON",
  Connected = "CONNECTED",
  MetaData = "METADATA",
}

export type ValueForEvent<Event> = Event extends CastEvent.MetaData
  ? object | undefined
  : Event extends CastEvent.Finished | CastEvent.CurrentFile
  ? string
  : Event extends CastEvent.Progress | CastEvent.Duration
  ? number
  : Event extends
      | CastEvent.Playing
      | CastEvent.Connected
      | CastEvent.SubtitlesOn
  ? boolean
  : never;

export const emitter: {
  on: <Event extends CastEvent>(
    event: Event,
    callback: (data: ValueForEvent<Event>) => void
  ) => void;
  off: <Event extends CastEvent>(
    event: Event,
    callback: (data: ValueForEvent<Event>) => void
  ) => void;
  emit: <Event extends CastEvent>(
    event: Event,
    data: ValueForEvent<Event>
  ) => void;
} = new EventEmitter<CastEvent>();
