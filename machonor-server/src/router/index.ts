import * as Router from 'koa-router';

import core from './core';
import auth from './auth';
import posts from './posts';
import users from './users';

export class ApiRouter {
  public api: Router;

  constructor() {
    this.api = new Router();
    this.routes();
  }

  public routes = (): void => {
    const { api } = this;
    api.use('/core', core.routes());
    api.use('/auth', auth.routes());
    api.use('/posts', posts.routes());
    api.use('/users', users.routes());
  }
}

const apiRouter = new ApiRouter();
const api = apiRouter.api;

export default api;