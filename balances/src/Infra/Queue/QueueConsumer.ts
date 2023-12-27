export default interface QueueConsumer {
    consume(topic: string, callback: any): Promise<void>;
}