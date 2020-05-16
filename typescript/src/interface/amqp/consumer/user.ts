import { Logger } from '../../../util/logger';

import {
  AmqpChannel,
  IAmqpConsumer,
  AmqpConsumerConfig,
} from '../../../types/interface';

export class UserConsumer implements IAmqpConsumer {
  private userUseCase: AmqpConsumerConfig['coreContainer']['userUseCase'];

  constructor({ coreContainer }: AmqpConsumerConfig) {
    this.userUseCase = coreContainer.userUseCase;
  }

  assertQueue(channel: AmqpChannel): void {
    channel.consume('user.create', this.createUser);
  }

  async createUser(): Promise<void> {
    const user = await this.userUseCase.createBasicUser({
      email: 'testEmail@gmail.com',
    });

    Logger.info({ user }, 'user created from amqp interface');
  }
}
