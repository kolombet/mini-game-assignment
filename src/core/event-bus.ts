import { EventType } from "./enums";

export interface Receiver {
  receive(event: EventType);
}

export interface BusInterface {
  subscribe(receiver: Receiver): void;
  unsubscribe(receiver: Receiver): void;
  publish(topic: EventType): Promise<void>;
}

class EventBus implements BusInterface {
  receivers: Receiver[] = [];

  public subscribe(receiver: Receiver) {
    this.receivers.push(receiver);
  }

  public unsubscribe(receiver: Receiver) {
    this.receivers = this.receivers.filter((item) => item !== receiver);
  }

  public async publish(topic: EventType): Promise<void> {
    this.receivers.map(
      (receiver) => new Promise((resolve) => resolve(receiver.receive(topic)))
    );
  }
}

const eventBus = new EventBus();
export default eventBus;
