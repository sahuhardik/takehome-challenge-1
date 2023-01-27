import { Request, Response } from 'express';

import { Web3 } from '../../services/Web3';
import { User } from '../../models/user.model';
import { INft } from '../../types';

export const getUserNFts = async (req: Request, res: Response) => {
  const publicAddress = (req as any).auth.payload.publicAddress;
  const web3 = new Web3(publicAddress);

  const { id: userId } = (req as any).auth.payload;
  const user = await  User.findByPk(userId)
    
  if(!user) {
    return res.status(401).send({
      error: 'Failed',
    });
  }

  const favoriteNFTS = (user?.favoriteNFTS || [] ) as string[];
  const walletNfts = await web3.getNftList();

  const nfts = walletNfts.map((nft: INft) => ({...nft, isFavorite: favoriteNFTS.includes(nft.id)}));

  res.json({ nfts });
};

export const toggleNFT = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id: userId } = (req as any).auth.payload;

  const user = await  User.findByPk(userId)
    
  if(!user) {
    return res.status(401).send({
      error: 'Failed',
    });
  }

  let favoriteNFTS = (user?.favoriteNFTS || [] ) as string[];
  if(favoriteNFTS.includes(id)) {
    favoriteNFTS = (favoriteNFTS.filter((nftId: string) => nftId !== id));
  } else {
    favoriteNFTS.push(id);
  }

  await User.update({
    favoriteNFTS,
  }, {
     where: { id: userId }
  })
  res.json({});
};
