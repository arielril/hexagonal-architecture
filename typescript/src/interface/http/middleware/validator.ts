import { AnySchema } from '@hapi/joi';
import { curryN } from 'ramda';

import { HttpRequest, HttpResponse, HttpNext } from '../../../types/interface';
import { Logger } from '../../../util/logger';

export const validator = curryN(
  4,
  (schema: AnySchema, req: HttpRequest, res: HttpResponse, next: HttpNext) => {
    const validation = schema.validate(req, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: true,
    });

    if (validation.error) {
      Logger.debug({
        class: 'Validator',
        classType: 'HttpMiddleware',
        details: validation.error.details,
      }, 'invalid request params');
      return next(new Error('Invalid request params'));
    }

    Object.assign(req, validation.value);

    return next();
  },
);
