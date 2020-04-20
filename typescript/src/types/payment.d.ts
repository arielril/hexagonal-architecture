export type Payment = {
  id: string;
};

export interface IPaymentService {
  authorize(): any;
  capture(): any;
  findById(id: Payment['id']): Payment;
}

export interface IPaymentRepository {
  authorize(params: any): void;
  capture(): void;
  authorizeAndCapture(): void;
  find(): void;
  cancel(): void;
}

export interface IPaymentUseCase {
  authorizeCreditCardPayment(props: any): any;
  authorizeAndCaptureCreditCardPayment(props: any): any;
}
