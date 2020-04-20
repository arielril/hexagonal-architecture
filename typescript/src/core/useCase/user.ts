import { IUserUseCase } from '../../types/user';
import { UseCaseContext } from '../../types/core';

export class UserUseCase implements IUserUseCase {
  private userService: UseCaseContext['userService'];

  constructor(ctx: UseCaseContext) {
    this.userService = ctx.userService;
  }

  // eslint-disable-next-line class-methods-use-this
  createBasicUser(props: any) {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line class-methods-use-this
  createUserAndSendNotificationEmail(props: any) {
    throw new Error('Method not implemented.');
  }
}
