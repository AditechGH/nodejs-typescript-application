import app from './common';

const middleWares = [
  app.corsMiddleware,
  app.bodyRequestParsingMiddleware,
  app.morganMiddleware
];

if (process.env.NODE_ENV === 'production') {
  middleWares.push(app.compressionMiddleware);
  middleWares.push(app.helmetMiddleware);
}

export default middleWares;
