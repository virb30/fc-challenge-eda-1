import { AccountBalance } from "../../Domain/Entity/AccountBalance";
import { AccountBalanceRepository } from "../../Domain/Repository/AccountBalanceRepository";

export class AccountBalanceRepositoryMemory implements AccountBalanceRepository {
    private accountBalances: AccountBalance[] = [];


    async save(accountBalance: AccountBalance): Promise<void> {
        this.accountBalances.push(accountBalance);
    }

    async updateBalance(accountBalance: AccountBalance): Promise<void> {
        const accountIndex = this.accountBalances.findIndex(findBalance => findBalance.accountId === accountBalance.accountId);
        this.accountBalances.splice(accountIndex, 1, accountBalance);
    }

    async getBalance(accountId: string): Promise<AccountBalance> {
        const accountFound = this.accountBalances.find(accountBalance => accountBalance.accountId === accountId);

        if (!accountFound) {
            throw new Error("Account balance not found");
        }
        return accountFound;
    }

    async clear(): Promise<void> {
        this.accountBalances = [];
    }

}