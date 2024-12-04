import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import errorMiddleware from './middlewares/errorMiddleware';
import routes from './routes';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorMiddleware);

app.use('/api', routes);

export default app;
