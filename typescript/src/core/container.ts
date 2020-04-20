import { PaymentUseCase } from './useCase/payment';

import { PaymentService } from './service/payment';
import { UserSevice } from './service/user';

import { ContainerConfig, Container } from '../types/core';

export function createContainer(config: ContainerConfig): Container {
  const serviceContext = {
    paymentRepository: config.paymentRepository,
    userRepository: config.userRepository,
  };

  const useCaseContext = {
    paymentService: new PaymentService(serviceContext),
    userService: new UserSevice(serviceContext),
  };

  return {
    paymentUseCase: new PaymentUseCase(useCaseContext),
  };
}
