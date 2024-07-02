import express, { Request, Response } from 'express';

import { error } from '../middlewares/error';
import { apiRouter } from '../routes/api';

export const app = express();

app.use(express.json());

app.use(apiRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    errors: 'Not found',
  });
});

app.use(error);
