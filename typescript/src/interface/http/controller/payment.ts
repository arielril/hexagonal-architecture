/* eslint-disable class-methods-use-this */
import httpStatus from 'http-status-codes';

import { postPayment } from '../schema/payment';
import { Logger } from '../../../util/logger';

import {
  HttpRouter,
  HttpNext,
  HttpRequest,
  HttpResponse,
  IHttpRoute,
} from '../../../types/interface';

export class PaymentController implements IHttpRoute {
  private _validator: Function;

  constructor({ validator }: any) {
    this._validator = validator;
  }

  register(router: HttpRouter) {
    router
      .route('/')
      .post(
        this._validator(postPayment),
        this.postPayment.bind(this),
      );

    Logger.debug('fun: PaymentController.register end');
  }

  async postPayment(req: HttpRequest, res: HttpResponse, next: HttpNext) {
    try {
      res.status(httpStatus.OK).send({ success: true });
    } catch (err) {
      next(err);
    }
  }
}
