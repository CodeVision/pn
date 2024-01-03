import { EventIterator } from 'event-iterator';
interface Message {
    number: string;
}
export declare class MQTT {
    private topic;
    private client;
    constructor(topic: string, broker_url: string);
    publish(message: Message): Promise<void>;
    subscribe(): Promise<void>;
    receive(): EventIterator<string>;
    disconnect(): Promise<void>;
}
export {};
