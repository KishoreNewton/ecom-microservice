import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';

const router = express.Router();

router.post(
  '/api/users/signin',
  validateRequest,
  [body('email').isEmail().withMessage('E-Mail must be vaiid')],
  body('password').trim().notEmpty().withMessage('You must supply a password'),
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return next(new BadRequestError('Invalid Credentials'));
    }

    const passwordsMatch = await Password.compare(existingUser.password, password);

    if (!passwordsMatch) {
      return next(new BadRequestError('Invalid Credentials'));
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email
      },
      process.env.JWT_KEY!
    );
    // Store it on session object
    req.session = {
      jwt: userJwt
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
