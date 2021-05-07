import express, { Router } from 'express';
import request from 'supertest';
import config from '../../config/app.config';
import { applyMiddleware, applyRoutes } from '../../utils';
import middleware from '../../middleware';
import errorHandlers from '../../middleware/errorHandlers';
import routes from '..';

const constants = config.constants;
const path: string = `${constants.BASE_URL}helloWorld`;

describe('helloWorld', () => {
  let router: Router;

  beforeEach(() => {
    router = express();
    applyMiddleware(middleware, router);
    applyRoutes(routes, router);
    applyMiddleware(errorHandlers, router);
  });

  describe('GET /helloWorld', () => {
    it('prints hello world', async () => {
      const response = await request(router).post(`${path}`);
      expect(response.status).toBe(200);
    });

    it('fails with a non-existing api method', async () => {
      const response = await request(router).post('/api/v11/transcode');
      expect(response.status).toEqual(404);
    });
  });
});
