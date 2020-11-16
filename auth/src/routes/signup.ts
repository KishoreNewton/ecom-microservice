import express, { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('E-Mail must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 charcters')
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // throw new NotFoundError(); // Using sync + required library npm install express-async-errors
      return next(new RequestValidationError(errors.array())); // Using async
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new BadRequestError('E-Mail in use'));
    }

    const user = User.build({
      email,
      password
    });

    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_KEY!
    );
    // Store it on session object
    req.session = {
      jwt: userJwt
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
