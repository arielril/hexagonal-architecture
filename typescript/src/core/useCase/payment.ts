import { IPaymentUseCase } from '../../types/payment';
import { UseCaseContext } from '../../types/core';

export class PaymentUseCase implements IPaymentUseCase {
  private paymentService: UseCaseContext['paymentService'];

  constructor(ctx: UseCaseContext) {
    this.paymentService = ctx.paymentService;
  }

  // eslint-disable-next-line class-methods-use-this
  authorizeCreditCardPayment(props: any) {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line class-methods-use-this
  authorizeAndCaptureCreditCardPayment(props: any) {
    throw new Error('Method not implemented.');
  }
}
