import { User } from '@prisma/client';
import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { logger } from '../application/logger';
import { UserRequest } from '../types/user-request';

export const auth = async (
  req: UserRequest,
  res: Response,
  next: NextFunction,
) => {
  const JWT_SECRET = process.env.JWT_SECRET || 'secret';

  const authorization = req.get('authorization');

  if (authorization) {
    const token = authorization.split(' ')[1];

    if (authorization.startsWith('Bearer ') && !!token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as User;

        if (decoded) {
          req.user = decoded;
          next();
          return;
        }
      } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
          logger.error(err.message);
        }
      }
    }
  }

  res
    .status(401)
    .json({
      status: 401,
      errors: 'Unauthorized',
    })
    .end();
};
