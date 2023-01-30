import { NextFunction, Request, Response } from 'express';

import { User } from '../../models/user.model';

export const find = async (req: Request, res: Response, next: NextFunction) => {
  const whereClause =
    req.query && req.query.publicAddress ? { where: { publicAddress: req.query.publicAddress } } : undefined;

  return await User.findAll(whereClause)
    .then((users: User[]) => res.json(users))
    .catch(next);
};

export const get = (req: Request, res: Response, next: NextFunction) => {
  // Use of any is not good practice, we must have to give type
  const userId = (req as any).auth.payload.id;
  return User.findByPk(userId)
    .then((user: User | null) => res.json(user))
    .catch(next);
};

export const create = (req: Request, res: Response, next: NextFunction) => {
  User.create(req.body)
    .then((user: User) => res.json(user))
    .catch(next);
};
