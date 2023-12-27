import { UpdateBalanceController } from './Infra/Controller/UpdateBalanceController';
import { KafkaQueueConsumerAdapter } from './Infra/Queue/KafkaQueueConsumerAdapter';
import { MysqlConnectionAdapter } from './Infra/Database/MysqlConnectionAdapter';
import { AccountBalanceRepositoryDatabase } from './Infra/Repository/AccountBalanceRepositoryDatabase';
import { ExpressHttpAdapter } from './Infra/Http/ExpressHttpAdapter';
import { GetAccountBalanceController } from './Infra/Controller/GetBalanceController';

const server = new ExpressHttpAdapter();

const consumer = new KafkaQueueConsumerAdapter();
const connection = new MysqlConnectionAdapter("mysql://root:root@mysql:3306/balances");
const accountBalanceRepository = new AccountBalanceRepositoryDatabase(connection);

new UpdateBalanceController(consumer, accountBalanceRepository);
new GetAccountBalanceController(server, accountBalanceRepository);

server.listen(3003);