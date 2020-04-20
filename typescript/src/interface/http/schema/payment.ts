import joi from '@hapi/joi';

export const postPayment = joi.object({
  amount: joi.number().required(),
});
