import httpStatusCodes from 'http-status-codes';

import { HttpRequest, HttpResponse } from '../../../types/interface';
// import { Logger as logger } from '../../../logger';

export const errorHandler = (
  err: any,
  req: HttpRequest,
  res: HttpResponse,
) => {
  const status = httpStatusCodes.INTERNAL_SERVER_ERROR;
  const throwErr: Error = new Error(err.message);

  // if (status !== httpStatusCodes.INTERNAL_SERVER_ERROR) {
  //   logger.warn(err);
  // } else {
  //   logger.error(err);
  // }

  return res
    .status(status)
    .send(throwErr);
};
