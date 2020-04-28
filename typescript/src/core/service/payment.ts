/* eslint-disable class-methods-use-this */
import { ServiceContext } from '../../types/core';
import { IPaymentService, Payment } from '../../types/payment';

export class PaymentService implements IPaymentService {
  private paymentRepository: ServiceContext['paymentRepository'];

  constructor(ctx: ServiceContext) {
    this.paymentRepository = ctx.paymentRepository;
  }

  authorize(): object {
    throw new Error('Method not implemented.');
  }

  capture(): object {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Payment {
    throw new Error(`Method not implemented. ${id}`);
  }
}
