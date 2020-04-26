import { PaymentUseCase } from './useCase/payment';

import { PaymentService } from './service/payment';
import { UserService } from './service/user';

import { ContainerConfig, Container } from '../types/core';
import { UserUseCase } from './useCase/user';

export function createContainer(config: ContainerConfig): Container {
  const serviceContext = {
    paymentRepository: config.paymentRepository,
    userRepository: config.userRepository,
  };

  const useCaseContext = {
    paymentService: new PaymentService(serviceContext),
    userService: new UserService(serviceContext),
  };

  return {
    paymentUseCase: new PaymentUseCase(useCaseContext),
    userUseCase: new UserUseCase(useCaseContext),
  };
}
