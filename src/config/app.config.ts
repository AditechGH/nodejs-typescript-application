export default class Config {
    private static get baseUrl(): string {
      return '/api/v1/';
    }
  
    private static get env(): any {
      return process.env.NODE_ENV;
    }
  
    private static get devConfig(): any {
      return {
        database: `mongodb://localhost:27017/hello-world-dev`,  
        secret: process.env.DEV_SECRET,
        HTTP_PORT: process.env.PORT || 8080,
        HTTPS_PORT: process.env.PORT || 4343,
      };
    }
  
    private static get testConfig(): any {
      return {
        database: `mongodb://localhost:27017/hello-world-test`,
        secret: process.env.TEST_SECRET,
        HTTP_PORT: process.env.PORT || 3000,
        HTTPS_PORT: process.env.PORT || 4343,
      };
    }
  
    private static get prodConfig(): any {
      return {
        database: `mongodb://localhost:27017/hello-world-prod`,
        secret: process.env.SECRET,
        HTTP_PORT: process.env.PORT || 8080,
        HTTPS_PORT: process.env.PORT || 4343,
      };
    }
  
    private static get defaultConfig(): any {
      return {
        BASE_URL: this.baseUrl,
        ENV: this.env,
        REDIS_PORT: process.env.REDIS_PORT || 6379,
        REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
        REDIS_AUTH: process.env.REDIS_AUTH || null,
      };
    }
  
    private static envConfig(env: any): any {
      switch (env) {
        case 'development':
          return this.devConfig;
        case 'test':
          return this.testConfig;
        default:
          return this.prodConfig;
      }
    }
  
    /**
     * constants
     */
    public static get constants(): any {
      return { ...this.defaultConfig, ...this.envConfig(this.env) };
    }
  }
  