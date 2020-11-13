import express, { Request, Response } from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json());

app.get('/api/users/currentuser', (req: Request, res: Response) => {
  res.send('Hello There!');
});

const port: 3000 = 3000;
app.listen(port, () => {
  console.log(`🔥🔥🔥 Listening on port ${port} 🔥🔥🔥`);
});
