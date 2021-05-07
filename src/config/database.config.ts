import mongoose from 'mongoose';
import logger from './logger.config';
import config from './app.config';

const constants = config.constants;
mongoose.Promise = global.Promise;

class Database {
  /**
   * connect
   */
  public connect() {
    if (mongoose.connection.readyState === 0) {
      mongoose.connect(constants.database, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });
      mongoose.connection.on('connected', this.connected);
      mongoose.connection.on('error', this.error);
      process.on('SIGINT', () => {
        mongoose.connection.close(this.close);
      });
    }
  }
  /**
   * disconnect
   */
  public disconnect() {
    if (mongoose.connection.readyState !== 0) {
      mongoose.disconnect();
    }
  }

  private connected() {
    logger.info(`Successfully connected  to mongoDB on: ${constants.database}`);
  }

  private error(error: any) {
    logger.error(`Database Error: ${error.message}`, error);
  }

  private close() {
    logger.info(
      `Mongoose default connection is disconnected due to application termination`
    );
    process.exit(0);
  }
}

export default new Database();
