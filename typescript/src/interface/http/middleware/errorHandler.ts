import httpStatusCodes from 'http-status-codes';

import { Logger } from '../../../util/logger';

import { HttpRequest, HttpResponse, HttpNext } from '../../../types/interface';

export const errorHandler = (
  err: Error,
  req: HttpRequest,
  res: HttpResponse,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: HttpNext,
) => {
  const status = httpStatusCodes.INTERNAL_SERVER_ERROR;
  const throwErr: Error = new Error(err.message);

  Logger.error(err);

  return res
    .status(status)
    .send({
      name: throwErr.name,
      message: throwErr.message,
    });
};
