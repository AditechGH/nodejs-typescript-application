import { Router } from 'express';
import cors from 'cors';
import parser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { stream } from '../config/logger.config';

class App {
  public helmetMiddleware(router: Router): void {
    router.use(helmet());
  }

  public morganMiddleware(router: Router): void {
    router.use(morgan('combined', { stream }));
  }

  public compressionMiddleware(router: Router): void {
    router.use(compression());
  }

  public corsMiddleware(router: Router): void {
    router.use(cors({ credentials: true, origin: true }));
  }

  public bodyRequestParsingMiddleware(router: Router): void {
    router.use(parser.urlencoded({ extended: true }));
    router.use(parser.json());
  }
}

export default new App();
