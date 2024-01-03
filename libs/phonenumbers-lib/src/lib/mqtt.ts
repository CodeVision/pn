import { connect, MqttClient } from "mqtt";
import { EventIterator } from 'event-iterator';

interface Message {
  number: string
}

export class MQTT {
  private topic: string
  private client: MqttClient

  constructor(topic: string, broker_url: string) {
    this.topic = topic

    this.client = connect(broker_url);
  }

  async publish(message: Message) {
    try {
      await this.client.publishAsync(this.topic, JSON.stringify(message))
    } catch(error) {
      console.error(error)
    }
  }

  async subscribe() {
    try {
      await this.client.subscribeAsync(this.topic)
    } catch(error) {
      console.error(error);
    }
  }

  receive() {
    return new EventIterator<string>(
      queue => {
        this.client.on('message', (_topic, message) => queue.push(message.toString()))
        this.client.on('end', queue.stop)
        this.client.on('error', queue.fail)

        return () => {
          this.client.end()
        }
      }
    )
  }

  async disconnect() {
    this.client.end({ reasonCode: 0x00 })
  }
}
