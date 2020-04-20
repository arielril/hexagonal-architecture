import { ServiceContext } from '../../types/core';
import { IPaymentService, Payment } from '../../types/payment';

export class PaymentService implements IPaymentService {
  private paymentRepository: ServiceContext['paymentRepository'];

  constructor(ctx: ServiceContext) {
    this.paymentRepository = ctx.paymentRepository;
  }

  // eslint-disable-next-line class-methods-use-this
  authorize() {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line class-methods-use-this
  capture() {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line class-methods-use-this
  findById(id: string): Payment {
    throw new Error('Method not implemented.');
  }
}
