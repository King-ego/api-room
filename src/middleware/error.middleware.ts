import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../helpers/api-error';

export const AppMiddlewareError = (
  error: Error & Partial<ApiError>,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.message : 'Internal Server Error';
  return res.status(statusCode).send({ message });
};
