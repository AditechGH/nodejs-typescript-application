import { Request, Response, NextFunction } from 'express';

export class HelloWorldController {
  /**
   * helloWorld
   */
  public helloWorld(req: Request, res: Response) {
    res.status(200).write('Hello World!');
  }

}
