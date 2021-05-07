import config from '../../config/app.config';
import { HelloWorldController } from './helloWorld.controller';

const helloWorldController: HelloWorldController = new HelloWorldController();

const constants = config.constants;
const path: string = `${constants.BASE_URL}helloWorld`;

export default [
  {
    path: `${path}`,
    method: 'get',
    handler: [helloWorldController.helloWorld],
  }
];
