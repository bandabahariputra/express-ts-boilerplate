import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { ResponseError } from '../application/error';

export const error = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      status: 400,
      errors: `Validation Error: ${JSON.stringify(error)}`,
    });
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      status: error.status,
      errors: error.message,
    });
  } else {
    res.status(500).json({
      status: 500,
      errors: error.message,
    });
  }
};
