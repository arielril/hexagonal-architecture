/* eslint-disable no-redeclare */
import { AnySchema } from '@hapi/joi';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // tslint:disable-next-line: interface-name
    interface Matchers<R, T> {
      /**
       * Checks if the object matches the schema
       * @param schema Joi schema
       */
      toMatchSchema(schema: AnySchema): R;
    }
  }
}

/**
 * Checks if the object matches the schema
 * @param received Object to be checked
 * @param schema Joi schema
 */
function toMatchSchema(received: object, schema: AnySchema) {
  const { error } = schema.validate(received, {
    allowUnknown: true,
  });

  if (!error) {
    return {
      message: () => 'received value matches it the schema',
      pass: true,
    };
  }

  return {
    message: () => `expected ${
      JSON.stringify(received)} to be valid, instead the validation return the error: ${JSON.stringify(error.message)}`,
    pass: false,
  };
}

expect.extend({ toMatchSchema });
