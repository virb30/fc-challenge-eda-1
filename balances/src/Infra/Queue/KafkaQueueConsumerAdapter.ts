import QueueConsumer from "./QueueConsumer";
import { Consumer, Kafka } from "kafkajs";

export class KafkaQueueConsumerAdapter implements QueueConsumer {

    private consumer: Consumer;

    constructor() {
        const kafka = new Kafka({
            brokers: ["kafka:29092"]
        });
        this.consumer = kafka.consumer({
            groupId: "wallet"
        })
    }

    async consume(topic: string, callback: any): Promise<void> {
        await this.consumer.connect()
        await this.consumer.subscribe({
            topic,
            fromBeginning: true
        });
        await this.consumer.run({
            eachMessage: ({ message }) => {
                return callback(message);
            }
        })
    }

}