import { AccountBalance } from "../Domain/Entity/AccountBalance";
import { AccountBalanceRepository } from "../Domain/Repository/AccountBalanceRepository";
import { AccountBalanceRepositoryMemory } from "../Infra/Repository/AccountBalanceRepositoryMemory";
import { UpdateBalanceUseCase } from "./UpdateBalanceUseCase";

describe("UpdateBalanceUseCase tests", () => {

    let accountBalanceRepository: AccountBalanceRepository;

    beforeAll(() => {
        accountBalanceRepository = new AccountBalanceRepositoryMemory();
    });

    beforeEach(async () => {
        accountBalanceRepository.clear();
    });

    it("should update balance", async () => {
        await accountBalanceRepository.save(new AccountBalance("123", 1000));
        await accountBalanceRepository.save(new AccountBalance("456", 100));
        const usecase = new UpdateBalanceUseCase(accountBalanceRepository);
        const spy = jest.spyOn(accountBalanceRepository, "updateBalance");
        const input = {
            accountIdFrom: "123",
            accountIdTo: "456",
            balanceAccountFrom: 900,
            balanceAccountTo: 200
        }
        await usecase.execute(input);
        expect(spy).toHaveBeenCalledTimes(2);

        const newAccountBalanceFrom = await accountBalanceRepository.getBalance("123");
        const newAccountBalanceTo = await accountBalanceRepository.getBalance("456");

        expect(newAccountBalanceFrom.balance).toBe(900);
        expect(newAccountBalanceTo.balance).toBe(200);
    })
});