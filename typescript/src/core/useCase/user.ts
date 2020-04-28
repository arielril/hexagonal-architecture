import * as R from 'ramda';
import joi from '@hapi/joi';

import { IUserUseCase, User } from '../../types/user';
import { UseCaseContext } from '../../types/core';
import { Logger } from '../../util/logger';

export class UserUseCase implements IUserUseCase {
  private userService: UseCaseContext['userService'];

  constructor(ctx: UseCaseContext) {
    this.userService = ctx.userService;
  }

  async createBasicUser(props: Partial<User>) {
    const schemaValidation = joi.object({
      email: joi.string().email(),
      fullName: joi.string().regex(/\w+ (\w+ *)+/),
    });

    const er = schemaValidation.validate(props, {
      stripUnknown: true,
      abortEarly: false,
    });

    if (er.error) {
      Logger.debug({
        details: er.error.details,
        class: 'UserUseCase',
        classType: 'UseCse',
      }, 'invalid properties to create an user');
      throw new Error('Invalid properties to create an user');
    }

    const user = {
      email: props.email,
      fullName: props.fullName,
    };

    const userId = await this.userService.createUser(user);

    return R.assoc('id', userId, user) as User;
  }

  // eslint-disable-next-line class-methods-use-this
  createUserAndSendNotificationEmail(props: object): object {
    throw new Error(`Method not implemented.${props}`);
  }
}
