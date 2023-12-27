import { Message } from "kafkajs";
import { UpdateBalanceUseCase } from "../../Application/UpdateBalanceUseCase";
import { AccountBalanceRepository } from "../../Domain/Repository/AccountBalanceRepository";
import QueueConsumer from "../Queue/QueueConsumer";

export class UpdateBalanceController {
    constructor(queue: QueueConsumer, accountBalanceRepository: AccountBalanceRepository) {
        const accountBalanceUseCase = new UpdateBalanceUseCase(accountBalanceRepository);

        queue.consume("balances", async (message: Message) => {
            if (!message.value?.toString()) {
                throw new Error("invalid message");
            }

            const decodedMessage = JSON.parse(message.value.toString());

            const input = {
                accountIdFrom: decodedMessage.Payload.account_id_from,
                accountIdTo: decodedMessage.Payload.account_id_to,
                balanceAccountFrom: decodedMessage.Payload.balance_account_from,
                balanceAccountTo: decodedMessage.Payload.balance_account_to
            }
            await accountBalanceUseCase.execute(input);
            console.log("message consumed: ", message.value.toString())
        }).catch((err) => console.log(err))
    }
}
