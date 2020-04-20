import database from '../util/knex';

import { PaymentRepository } from './repository/payment';
import { UserRepository } from './repository/user';

import { MysqlAdapter } from './adapter/mysql';
import { HttpAdapter } from './adapter/http';

import { ContainerConfig, Container } from '../types/infrastructure';

export function createContainer(config: ContainerConfig): Container {
  const dbConnection = database();

  return {
    paymentRepository: new PaymentRepository({
      config,
      httpAdapter: HttpAdapter,
    }),
    userRepository: new UserRepository({
      mysqlAdapter: new MysqlAdapter({
        dbConn: dbConnection,
      }),
    }),
  };
}
