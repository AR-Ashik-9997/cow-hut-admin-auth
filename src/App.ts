import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrorHandler';
import router from './app/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
const app: Application = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// application route
app.use('/api/v1/', router);

// global error handler
app.use(globalErrorHandler);

// not found route

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
