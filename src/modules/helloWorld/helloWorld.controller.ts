import { Request, Response, NextFunction } from 'express';

export class HelloWorldController {
  /**
   * helloWorld
   */
  public helloWorld(req: Request, res: Response) {
    res.json('Hello World!');
  }

}
