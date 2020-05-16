import { PaymentRepository } from './repository/payment';
import { UserRepository } from './repository/user';

import { MysqlAdapter } from './adapter/mysql';
import { HttpAdapter } from './adapter/http';
import { MessageBusAdapter } from './adapter/messageBus';

import {
  ContainerConfig,
  Container,
} from '../types/infrastructure';

export function createContainer(config: ContainerConfig): Container {
  return {
    paymentRepository: new PaymentRepository({
      config,
      httpAdapter: HttpAdapter,
    }),
    userRepository: new UserRepository({
      mysqlAdapter: new MysqlAdapter(),
      messageBusAdapter: MessageBusAdapter,
    }),
  };
}
