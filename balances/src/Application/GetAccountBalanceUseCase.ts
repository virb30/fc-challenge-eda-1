import { AccountBalanceRepository } from "../Domain/Repository/AccountBalanceRepository";

export class GetAccountBalanceUseCase {
    constructor(private accountBalanceRepository: AccountBalanceRepository) { }

    async execute(input: GetAccountBalanceInputDto): Promise<GetAccountBalanceOutputDto> {
        const accountBalance = await this.accountBalanceRepository.getBalance(input.accountId);
        return {
            accountId: accountBalance.accountId,
            balance: accountBalance.balance
        }
    }
}

export type GetAccountBalanceInputDto = {
    accountId: string;
}

export type GetAccountBalanceOutputDto = {
    accountId: string;
    balance: number;
}