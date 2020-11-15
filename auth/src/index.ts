import express from 'express';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import mongoose from 'mongoose';
import { DatabaseConnectionError } from './errors/database-connection-error';
import { cookie } from 'express-validator';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all('*', async (req, res, next) => {
  // next(new NotFoundError()); // Using async
  throw new NotFoundError(); // Using sync + required library npm install express-async-errors
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  } catch (err) {
    throw new DatabaseConnectionError();
  }
};

const port: 3000 = 3000;
app.listen(port, () => {
  console.log(`🔥🔥🔥 Listening on port ${port} 🔥🔥🔥`);
});

start();
