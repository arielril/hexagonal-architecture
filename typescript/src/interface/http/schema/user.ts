import joi from '@hapi/joi';

export const postUser = joi.object({
  body: joi.object({
    emailAddress: joi.string().email().required(),
    completeName: joi.string().min(5).required(),
  }).required(),
});
