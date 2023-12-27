import { AccountBalance } from "../Domain/Entity/AccountBalance";
import { AccountBalanceRepository } from "../Domain/Repository/AccountBalanceRepository";
import { AccountBalanceRepositoryMemory } from "../Infra/Repository/AccountBalanceRepositoryMemory";
import { GetAccountBalanceUseCase } from "./GetAccountBalanceUseCase";

describe("GetAccountBalanceUseCase tests", () => {

    let accountBalanceRepository: AccountBalanceRepository;

    beforeAll(() => {
        accountBalanceRepository = new AccountBalanceRepositoryMemory();
    });

    beforeEach(async () => {
        accountBalanceRepository.clear();
    });
    it("should get account balance", async () => {
        await accountBalanceRepository.save(new AccountBalance("123", 200, new Date("2023-01-01T10:00:00")));

        const input = {
            accountId: "123"
        };

        const usecase = new GetAccountBalanceUseCase(accountBalanceRepository);
        const output = await usecase.execute(input);

        expect(output.accountId).toBe("123");
        expect(output.balance).toBe(200);
    });

    it("should throw exception if account balance not found", async () => {
        const input = {
            accountId: "123"
        };

        const usecase = new GetAccountBalanceUseCase(accountBalanceRepository);

        expect(async () => {
            await usecase.execute(input);
        }).rejects.toThrow(new Error("Account balance not found"));
    });
});