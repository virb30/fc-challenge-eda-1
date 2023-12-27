import { AccountBalance } from "../../Domain/Entity/AccountBalance";
import { AccountBalanceRepository } from "../../Domain/Repository/AccountBalanceRepository";
import { Connection } from "../Database/Connection";

export class AccountBalanceRepositoryDatabase implements AccountBalanceRepository {

    constructor(private connection: Connection) { }

    async getBalance(accountId: string): Promise<AccountBalance> {
        const [accountBalanceData] = await this.connection.query("SELECT * FROM account_balances WHERE account_id = ? ORDER BY id DESC LIMIT 1", [accountId]);
        if (!accountBalanceData) {
            throw new Error("Account balance not found");
        }
        return new AccountBalance(accountBalanceData.account_id, accountBalanceData.balance);
    }

    async save(accountBalance: AccountBalance): Promise<void> {
        await this.connection.query("INSERT INTO account_balances(account_id, balance, created_at, updated_at) VALUES (?,?,NOW(),NOW())", [accountBalance.accountId, accountBalance.balance]);
    }

    async updateBalance(accountBalance: AccountBalance): Promise<void> {
        await this.connection.query("UPDATE account_balances SET balance = ?, updated_at = NOW() WHERE account_id = ?", [accountBalance.balance, accountBalance.accountId]);
    }

    async clear(): Promise<void> {
        await this.connection.query("TRUNCATE TABLE account_balances", []);
    }
}