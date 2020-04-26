import { IUserService, IUserUseCase } from './user';
import { IPaymentService, IPaymentUseCase } from './payment';
import { Container as infraContainer } from './infrastructure';

export type Container = {
  paymentUseCase: IPaymentUseCase;
  userUseCase: IUserUseCase;
};

export type ContainerConfig = {
  userRepository: infraContainer['userRepository'];
  paymentRepository: infraContainer['paymentRepository'];
};

export type ServiceContext = {
  userRepository: ContainerConfig['userRepository'];
  paymentRepository: ContainerConfig['paymentRepository'];
};

export type UseCaseContext = {
  userService: IUserService;
  paymentService: IPaymentService;
};
