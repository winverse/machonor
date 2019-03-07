import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as Serve from 'koa-static';
import * as Path from 'path';

import ssr from './ssr';

export default class Server {
  public app: Koa;
  public router: Router;
  constructor() {
    this.app = new Koa();
    this.router = new Router();
    this.routes();
    this.middleware();
  }
  public routes = (): void => {
    const { router } = this;
    router.get('/api/ping', (ctx: Koa.Context) => {
      ctx.body = {
        message: 'pong',
      };
    });
  }
  public middleware = (): void => {
    const { app, router } = this;
    const publicPath = Path.join(__dirname, '../../webuy-client/build');
    app.use(router.routes()).use(router.allowedMethods());
    app.use(Serve(publicPath));
    app.use(ssr);
  }
  public listen = (port: number): void => {
    const { app } = this;
    app.listen(port, () => {
      console.log(`ssr server running ${port}`);
    });
  }
}