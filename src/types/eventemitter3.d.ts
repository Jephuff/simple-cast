type ListenerFn = (...args: Array<any>) => void;

declare module "eventemitter3" {
  const EventEmitter: new () => {
    /**
     * Return an array listing the events for which the emitter has registered
     * listeners.
     */

    eventNames(): Array<string | symbol>;

    /**
     * Return the listeners registered for a given event.
     */
    listeners(
      event: string | symbol,
      exists: boolean
    ): Array<ListenerFn> | boolean;
    listeners(event: string | symbol): Array<ListenerFn>;

    /**
     * Calls each of the listeners registered for a given event.
     */
    emit(event: string | symbol, ...args: Array<any>): boolean;

    /**
     * Add a listener for a given event.
     */
    on(event: string | symbol, fn: ListenerFn, context?: any): void;
    addListener(event: string | symbol, fn: ListenerFn, context?: any): void;

    /**
     * Add a one-time listener for a given event.
     */
    once(event: string | symbol, fn: ListenerFn, context?: any): void;

    /**
     * Remove the listeners of a given event.
     */
    removeListener(
      event: string | symbol,
      fn?: ListenerFn,
      context?: any,
      once?: boolean
    ): void;
    off(
      event: string | symbol,
      fn?: ListenerFn,
      context?: any,
      once?: boolean
    ): void;

    /**
     * Remove all listeners, or those of the specified event.
     */
    removeAllListeners(event?: string | symbol): void;
  };
  export = EventEmitter;
}
