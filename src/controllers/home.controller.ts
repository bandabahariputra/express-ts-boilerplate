import { Request, Response } from 'express';

export class HomeController {
  static welcome(req: Request, res: Response) {
    res.status(200).send({
      status: 200,
      data: {
        message: 'Welcome to Express TS Boilerplate',
      },
    });
  }
}
