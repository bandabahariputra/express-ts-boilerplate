import express from 'express';

import { error } from '../middlewares/error';
import { apiRouter } from '../routes/api';

export const app = express();

app.use(express.json());

app.use(apiRouter);

app.use(error);
