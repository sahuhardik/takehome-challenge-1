import express from 'express';
import { expressjwt as jwt } from 'express-jwt';

import { config } from '../../config';
import * as controller from './usersController';

export const userRouter = express.Router();

userRouter.get('/', controller.find);

userRouter.get('/me', jwt(config), controller.get);

userRouter.post('/', controller.create);
