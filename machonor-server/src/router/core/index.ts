import * as Router from 'koa-router';

import coreCtrl from './coreCtrl';

export class CoreRouter {
  public core: Router;

  constructor() {
    this.core = new Router();
    this.routes();
  }

  public routes = (): void => {
    const { core } = this;
    core.get('/lang', coreCtrl.getLang);
  }
}

const coreRouter = new CoreRouter();
const core = coreRouter.core;

export default core;