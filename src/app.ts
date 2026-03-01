import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import healthCheckRouter from './routes/health_check';
import { errorMiddleware } from './middleware/error.middleware';
import { requestMiddleware } from './middleware/request.middleware';
import { responseMiddleware } from './middleware/response.middleware';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(requestMiddleware);
app.use(responseMiddleware);
app.use('/', healthCheckRouter);
app.use(errorMiddleware);

export default app;
