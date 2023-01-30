import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { config } from '../../config';
import { User } from '../../models/user.model';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { signature, publicAddress } = req.body;
  if (!signature || !publicAddress) {
    return res.status(400).send({ message: 'signature and publicAddress is required' });
  }

  // We have to put all this business logics in service layer like user.service
  // Get the user with the given publicAddres
  const user = new User();
  const userExists = await User.findOne({ where: { publicAddress } });
  if (!userExists) {
    user.nonce = Math.floor(Math.random() * 10000);
    return user.save();
  } else {
    // if user exists then verify user signature
    const msg = `nonce: ${userExists.nonce}`;
    const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
    const address = recoverPersonalSignature({
      data: msgBufferHex,
      sig: signature,
    });
    //match stored address with address found after verify signature

    if (address.toLowerCase() === publicAddress.toLowerCase()) {
      // we can bundle and generalise following in method of SingnatureManager utility
      //create jwt token
      const token = jwt.sign(
        {
          payload: {
            id: userExists.id,
            publicAddress,
          },
        },
        config.secret,
        {
          algorithm: config.algorithms[0],
        }
      );
      return res.json({ accessToken: token });
    } else {
      res.status(401).send({
        error: 'Signature verification failed',
      });
    }
  }
};
