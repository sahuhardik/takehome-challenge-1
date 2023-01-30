import express from 'express';

import * as controller from './authController';

export const authRouter = express.Router();

/**
 * We can implement request param validator middleware and can be done easily by schema validation libraries like joi or anything
    const authSchema = {
    header: { ...header validations }
    body: {
      signature: Joi.string().required(),
      publicAddress: Joi.string().required(),
    },
  }
 * authRouter.post('/', validate(authSchema) ,controller.login);
 */
authRouter.post('/', controller.login);
