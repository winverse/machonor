import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as koaBody from 'koa-body';
import * as path from 'path';
import * as serve from 'koa-static';

import ssr from './ssr';

import { sequelize, sync } from 'database';
import authToken from 'lib/middlewares/authToken';
import crossOrigin from 'lib/middlewares/crossOrigin';

import api from 'router';

export default class Server {
  public app: Koa;
  public router: Router;

  constructor() {
    this.app = new Koa();
    this.router = new Router();
    this.initializeDB();
    this.routes();
    this.middleware();
  }

  public initializeDB = (): void => {
    sequelize.authenticate().then(
      () => {
        sync();
        console.log('DB connection is established');
      },
      (err) => {
        console.log(`Unable to connect to DB: ${err}`);
      },
    );
  }

  public routes = (): void => {
    const { router } = this;
    router.use('/api', api.routes());
  }

  public middleware = (): void => {
    const { app, router } = this;
    const staticPath = path.join(__dirname, '../../webuy-client/build');
    const uploadPath = path.join(__dirname, '../');
    app.use(crossOrigin);
    app.use(koaBody());
    app.use(authToken);
    app.use(serve(uploadPath));
    app.use(router.routes()).use(router.allowedMethods());
    app.use(serve(staticPath));
    // app.use(ssr);
  }

  public listen = (port: number): void => {
    const { app } = this;
    app.listen(port, () => {
      console.log(`server is running, port number is ${port}`);
    });
  }
}