import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
};

export const defaultErrorHandler = (
    message: string,
    errorCode: number
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        res.status(errorCode).json({ message });
    };
}

export type defaultErrorHandlerType = typeof defaultErrorHandler;