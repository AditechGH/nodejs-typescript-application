import express from 'express';
import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

// import databaseHelper from './config/database.config';
import config from './config/app.config';
import logger from './config/logger.config';
import routes from './modules';

import { applyMiddleware, applyRoutes } from './utils';
import middleware from './middleware';
import errorHandlers from './middleware/errorHandlers';
// databaseHelper.connect();

const constants = config.constants;
const router = express();

applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

process.on('uncaughtException', (e) => {
  logger.error(`uncaughtException => `, e);
  process.exit(1);
});

process.on('unhandledRejection', (e) => {
  logger.error(`unhandledRejection => `, e);
  process.exit(1);
});

http.createServer(router).listen(constants.HTTP_PORT, () => {
  logger.info(
    `http running on port: ${constants.HTTP_PORT} - Running on ${constants.ENV}`
  );
});
