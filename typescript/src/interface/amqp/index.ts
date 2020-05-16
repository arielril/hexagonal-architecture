import { getChannel } from '../../util/amqplib';

import { UserConsumer } from './consumer/user';

import { Container } from '../../types/core';
import {
  IAmqpConsumer,
  AmqpChannel,
  IAmqpInterface,
} from '../../types/interface';
import { Logger } from '../../util/logger';

type Config = {
  env: typeof import('../../util/env').env;
  coreContainer: Container;
};

export class AmqpInterface implements IAmqpInterface {
  private _env: Config['env'];
  private coreContainer: Config['coreContainer'];
  private channel: AmqpChannel | null;

  constructor(config: Config) {
    this._env = config.env;
    this.coreContainer = config.coreContainer;
    this.channel = null;
  }

  private async getChannel(): Promise<AmqpChannel> {
    if (this.channel === null) {
      this.channel = await getChannel();
    }
    return this.channel;
  }

  private async connectConsumers(): Promise<void> {
    const channel = await this.getChannel();

    [
      new UserConsumer({ coreContainer: this.coreContainer }),
    ]
      .forEach((consumer: IAmqpConsumer) => {
        consumer.assertQueue(channel);
      });
  }

  // eslint-disable-next-line class-methods-use-this
  private _debug(info: object = {}, msg: string = '') {
    Logger.debug({
      class: 'AmqpInterface',
      classType: 'Interface',
      ...info,
    }, msg);
  }

  async connect(): Promise<void> {
    await this.connectConsumers();
    this._debug({}, 'amqp interface initialized');
  }
}
