import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/errorHandler';

class ErrorHandlers {
  public handle404Error(router: any) {
    router.use((req: Request, res: Response) => {
      ErrorHandler.notFoundError();
    });
  }

  public handleClientError(router: any) {
    router.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        ErrorHandler.clientError(err, res, next);
      }
    );
  }

  public handleServerError(router: any) {
    router.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        ErrorHandler.serverError(err, res, next);
      }
    );
  }
}

export default [
  new ErrorHandlers().handle404Error,
  new ErrorHandlers().handleClientError,
  new ErrorHandlers().handleServerError,
];
