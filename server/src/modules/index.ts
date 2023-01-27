import express from 'express';

import { authRouter } from './auth/authRoutes';
import { userRouter } from './users/usersRoutes';
import { nftRouter } from './nfts/nftsRoutes';

export const services = express.Router();

services.use('/auth', authRouter);
services.use('/nfts', nftRouter);
services.use('/users', userRouter);
