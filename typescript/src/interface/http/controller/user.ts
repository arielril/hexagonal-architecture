import httpStatus from 'http-status-codes';
import * as R from 'ramda';

import { Logger } from '../../../util/logger';
import { postUser } from '../schema/user';

import {
  IHttpRoute,
  HttpControllerConfig,
  HttpRouter,
  HttpRequest,
  HttpResponse,
  HttpNext,
} from '../../../types/interface';

export class UserController implements IHttpRoute {
  private _validator: HttpControllerConfig['validator'];
  private userUseCase: HttpControllerConfig['coreContainer']['userUseCase'];

  constructor({ validator, coreContainer }: HttpControllerConfig) {
    this._validator = validator;
    this.userUseCase = coreContainer.userUseCase;
  }

  register(r: HttpRouter) {
    r.route('/users')
      .post(
        this._validator(postUser),
        this.postUser.bind(this),
      );

    Logger.debug('fun: UserController.register end');
  }

  async postUser(req: HttpRequest, res: HttpResponse, next: HttpNext) {
    try {
      const newUser = {
        email: R.path<string>(['body', 'emailAddress'], req),
        fullName: R.path<string>(['body', 'completeName'], req),
      };

      const createdUser = await this.userUseCase.createBasicUser(newUser);

      res.status(httpStatus.OK).send(createdUser);
    } catch (error) {
      next(error);
    }
  }
}
