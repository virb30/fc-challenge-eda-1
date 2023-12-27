import { AccountBalance } from "../Domain/Entity/AccountBalance";
import { AccountBalanceRepository } from "../Domain/Repository/AccountBalanceRepository";

export class UpdateBalanceUseCase {
    constructor(private accountBalanceRepository: AccountBalanceRepository) {

    }

    async execute(input: UpdateBalanceInputDto): Promise<void> {

        const accountBalanceFrom = new AccountBalance(input.accountIdFrom, input.balanceAccountFrom);
        const accountBalanceTo = new AccountBalance(input.accountIdTo, input.balanceAccountTo);

        await this.accountBalanceRepository.updateBalance(accountBalanceFrom);
        await this.accountBalanceRepository.updateBalance(accountBalanceTo);
    }
}

type UpdateBalanceInputDto = {
    accountIdFrom: string;
    accountIdTo: string;
    balanceAccountFrom: number;
    balanceAccountTo: number;
}