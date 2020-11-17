import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // throw new NotFoundError(); // Using sync + required library npm install express-async-errors
    return next(new RequestValidationError(errors.array())); // using async
  }

  next();
};
