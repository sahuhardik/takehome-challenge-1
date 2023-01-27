import express from 'express';
import { expressjwt as jwt } from 'express-jwt';

import { config } from '../../config';
import * as controller from './nftsController';

export const nftRouter = express.Router();

nftRouter.get('/', jwt(config), controller.getUserNFts);

nftRouter.post('/:id/toggle-favorite', jwt(config), controller.toggleNFT);
