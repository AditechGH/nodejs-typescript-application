import { Response, NextFunction } from 'express';
import { HTTPClientError } from './httpClientErrors';
import { HTTP404Error } from '../utils/http404Errors';
import logger from '../config/logger.config';

class ErrorHandler {
  notFoundError(): void {
    throw new HTTP404Error('Method not found.');
  }

  clientError(err: Error, res: Response, next: NextFunction): void {
    if (err instanceof HTTPClientError) {
      logger.warn('clientError => ', err);
      res.status(err.statusCode).send(err.message);
    } else {
      next(err);
    }
  }

  serverError(err: any, res: Response, _next: NextFunction): void {
    // tslint:disable-next-line:no-console
    console.log(err);
    logger.error('serverError => ', err);
    if (err.status) {
      res.status(err.status).send(err);
    } else if (process.env.NODE_ENV === 'production') {
      res.status(500).send('Internal Server Error');
    } else {
      res.status(500).send(err.stack);
    }
  }
}

export default new ErrorHandler();
