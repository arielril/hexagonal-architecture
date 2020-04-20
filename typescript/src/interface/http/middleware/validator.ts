import { AnySchema } from '@hapi/joi';
import { curryN } from 'ramda';

import { HttpRequest, HttpResponse, HttpNext } from '../../../types/interface';

export const validator = curryN(
  4,
  (schema: AnySchema, req: HttpRequest, res: HttpResponse, next: HttpNext) => {
    const validation = schema.validate(req, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: true,
    });

    if (validation.error) {
      return next(new Error('Invalid request params'));
    }

    Object.assign(req, validation.value);

    return next();
  },
);
