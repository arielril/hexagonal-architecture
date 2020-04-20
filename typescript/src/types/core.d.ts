import { IUserService } from './user';
import { IPaymentService } from './payment';
import { Container as infraContainer } from './infrastructure';

export type Container = {
  paymentUseCase: any;
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
