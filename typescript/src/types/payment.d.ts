export type Payment = {
  id: string;
};

export interface IPaymentService {
  authorize(): object;
  capture(): object;
  findById(id: Payment['id']): Payment;
}

export interface IPaymentRepository {
  authorize(params: object): void;
  capture(): void;
  authorizeAndCapture(): void;
  find(): void;
  cancel(): void;
}

export interface IPaymentUseCase {
  authorizeCreditCardPayment(props: object): object;
  authorizeAndCaptureCreditCardPayment(props: object): object;
}
