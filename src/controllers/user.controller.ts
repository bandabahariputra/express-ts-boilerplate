import { NextFunction, Response } from 'express';

import { UserService } from '../services/user.service';
import { UserRequest } from '../types/user-request';

export class UserController {
  static async getCurrentUser(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = await UserService.getById(req.user?.id as string);

      res.status(200).send({
        status: 200,
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const updatedUser = await UserService.update(
        req.user?.id as string,
        req.body,
      );

      res.status(200).send({
        status: 200,
        data: updatedUser,
      });
    } catch (err) {
      next(err);
    }
  }

  static async changePassword(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      await UserService.changePassword(req.user?.id as string, req.body);

      res.status(200).send({
        status: 200,
        data: {
          message: 'Password changed successfully',
        },
      });
    } catch (err) {
      next(err);
    }
  }
}
