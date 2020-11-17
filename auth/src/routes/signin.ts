import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post(
  '/api/users/signin',
  validateRequest,
  [body('email').isEmail().withMessage('E-Mail must be vaiid')],
  body('password').trim().notEmpty().withMessage('You must supply a password'),
  (req: Request, res: Response, next: NextFunction) => {
    
  }
);

export { router as signinRouter };
