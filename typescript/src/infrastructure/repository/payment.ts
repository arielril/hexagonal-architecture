import { IPaymentRepository } from '../../types/payment';
import {
  IHttpAdapterConstructs,
  IHttpAdapter,
  ContainerConfig,
} from '../../types/infrastructure';

type Context = {
  config: ContainerConfig;
  httpAdapter: IHttpAdapterConstructs;
};

export class PaymentRepository implements IPaymentRepository {
  private httpAdapter: IHttpAdapter;

  constructor({
    config,
    httpAdapter,
  }: Context) {
    // eslint-disable-next-line new-cap
    this.httpAdapter = new httpAdapter({
      baseURL: config.paymentProcessorUrl,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private createAuthorizeRequestConfig(params: object = {}) {
    return { ...params };
  }

  // eslint-disable-next-line class-methods-use-this
  private resolveAuthorizeResponse() { return {}; }

  // eslint-disable-next-line class-methods-use-this
  private rejectAuthorizeResponse() { return {}; }

  authorize(params: object): Promise<object> {
    const config = this.createAuthorizeRequestConfig(params);

    return this.httpAdapter
      .send(config)
      .then(this.resolveAuthorizeResponse)
      .catch(this.rejectAuthorizeResponse);
  }

  // eslint-disable-next-line class-methods-use-this
  capture(): void {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line class-methods-use-this
  authorizeAndCapture(): void {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line class-methods-use-this
  find(): void {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line class-methods-use-this
  cancel(): void {
    throw new Error('Method not implemented.');
  }
}
