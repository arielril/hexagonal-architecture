import * as amqplib from '../../util/amqplib';

import {
  IMessageBusAdapter,
  MessageBus,
  MessageBusAdapterConfig,
  MessageBusType,
  MessageContent,
} from '../../types/infrastructure';

/**
 * @class MessageBusAdapter
 * @classdesc Is an adapter for message queue communication
 */
export class MessageBusAdapter implements IMessageBusAdapter {
  private _messageBus: MessageBus | null;
  private _config?: MessageBusAdapterConfig;

  constructor(config?: MessageBusAdapterConfig) {
    this._messageBus = null;
    this._config = config;
  }

  private async getInstance(): Promise<MessageBus> {
    if (this._messageBus === null) {
      switch (this._config?.messageBusType) {
        case MessageBusType.withConfirmation:
          this._messageBus = await amqplib.getConfirmChannel();
          break;
        case MessageBusType.noConfirmation:
        default:
          this._messageBus = await amqplib.getChannel();
          break;
      }
    }

    return this._messageBus;
  }

  // eslint-disable-next-line class-methods-use-this
  private contentToBuffer(content: MessageContent): Buffer {
    switch (typeof content) {
      case 'object':
        return Buffer.from(JSON.stringify(content));
      case 'string':
        return Buffer.from(content, 'utf-8');
      default:
        return Buffer.from('', 'utf-8');
    }
  }

  async publish(
    router: string,
    routingKey: string,
    content: MessageContent,
    options?: any,
  ): Promise<boolean> {
    // convert the content to buffer
    const cBuffer = this.contentToBuffer(content);
    const msgBusInstance = await this.getInstance();

    return msgBusInstance
      .publish(router, routingKey, cBuffer, options);
  }
}
