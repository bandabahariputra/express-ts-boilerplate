import { NextFunction, Request, Response } from 'express';

import { CreateUserRequest, LoginRequest } from '../models/user.model';
import { AuthService } from '../services/auth.service';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;

      const data = await AuthService.register(request);

      res.status(201).send({
        status: 201,
        data: data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginRequest = req.body as LoginRequest;

      const data = await AuthService.login(request);

      res.status(200).send({
        status: 200,
        data: data,
      });
    } catch (err) {
      next(err);
    }
  }
}
