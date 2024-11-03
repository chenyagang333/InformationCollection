import type { EventHandler } from "./EventBusType";

export class EventBus {
  private static instance: EventBus;
  private events: Record<string, Set<EventHandler>> = {};

  private constructor() { }

  public static getInstance(): EventBus {
    return (EventBus.instance ??= new EventBus());
  }

  public on(eventName: string, eventHandler: EventHandler): void {
    (this.events[eventName] ??= new Set()).add(eventHandler)
  }

  public off(eventName: string, eventHandler: EventHandler): void {
    this.events[eventName]?.delete(eventHandler)
  }

  public emit(eventName: string, ...args: unknown[]): void {
    this.events[eventName]?.forEach((eventHandler) => {
      eventHandler(...args)
    })
  }

  public once(eventName: string, eventHandler: EventHandler): void {
    const onceHandler = (...args: unknown[]) => {
      eventHandler(...args);
      this.off(eventName, onceHandler);
    };
    this.on(eventName, onceHandler);
  }

}

export default EventBus.getInstance();
