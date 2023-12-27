import { AccountBalance } from "../Entity/AccountBalance";

export interface AccountBalanceRepository {
    save(accountBalance: AccountBalance): Promise<void>;
    updateBalance(accountBalance: AccountBalance): Promise<void>;
    getBalance(accountId: string): Promise<AccountBalance>;
    clear(): Promise<void>;
}