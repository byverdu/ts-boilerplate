import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

import { healthRouter } from '@routes/health';
import { userRouter } from '@routes/user';

const app: Express = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/health', healthRouter);
app.use('/user', userRouter);

app.use((req, res) => {
  res.status(404).send(`No handler found for ${req.url}`);
});

export { app };
