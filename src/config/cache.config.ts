import { createClient, RedisClient } from 'redis';
import logger from './logger.config';
import Config from './app.config';

const constants = Config.constants;

class Cache {
  public client: RedisClient;

  constructor() {
    this.client = createClient(constants.REDIS_PORT, constants.REDIS_HOST);
    this.client.on('connect', this.connected);
    this.client.on('error', this.error);
  }

  private connected(): void {
    logger.info(
      `Successfully connected to Redis on: ${constants.REDIS_HOST}:${constants.REDIS_PORT}`
    );
  }

  private error(error: any): void {
    logger.error(`Error in Redis client: ${error.message}`, error);
  }
}

export default new Cache();
