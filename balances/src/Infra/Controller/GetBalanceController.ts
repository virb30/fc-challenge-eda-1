import { GetAccountBalanceInputDto, GetAccountBalanceUseCase } from "../../Application/GetAccountBalanceUseCase";
import { AccountBalanceRepository } from "../../Domain/Repository/AccountBalanceRepository";
import { Http } from "../Http/Http";

export class GetAccountBalanceController {
    constructor(http: Http, accountBalanceRepository: AccountBalanceRepository) {
        http.on("GET", "/balances/:accountId", async (params) => {
            try {
                const usecase = new GetAccountBalanceUseCase(accountBalanceRepository);

                const input: GetAccountBalanceInputDto = {
                    accountId: params.accountId
                }
                const output = await usecase.execute(input);
                return {
                    status: 200,
                    data: output
                };
            } catch (error) {
                if (error instanceof Error) {
                    return {
                        status: 404,
                        data: {
                            message: error.message
                        }
                    }
                }

                return {
                    status: 500,
                    data: {
                        message: "internal server error"
                    }
                }
            }
        })
    }
}