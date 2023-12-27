import { AccountBalance } from "./AccountBalance";

describe("AccountBalance entity tests", () => {
    it("should create an AccountBalance with createdAt", () => {
        const createdAt = new Date("2023-01-01T10:00:00");
        const accountBalance = new AccountBalance("123", 100, createdAt);
        expect(accountBalance.createdAt).toBe(createdAt);
        expect(accountBalance.accountId).toBe("123");
        expect(accountBalance.balance).toBe(100);
    });

    it("should create an AccountBalance without createdAt", () => {
        const accountBalance = new AccountBalance("123", 100);
        expect(accountBalance.createdAt).toBeDefined();
        expect(accountBalance.accountId).toBe("123");
        expect(accountBalance.balance).toBe(100);
    });
});