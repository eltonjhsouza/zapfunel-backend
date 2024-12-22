import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRouter } from './routes/userRoutes';
import { workflowRouter } from './routes/workflowRoutes';
import { instanceRouter } from './routes/instanceRoutes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/workflows', workflowRouter);
app.use('/api/instances', instanceRouter);

app.use(errorHandler);

export default app;