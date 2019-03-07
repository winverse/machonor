import { Context } from 'koa';

export default function async(ctx: Context, next: () => Promise<any>) {
  ctx.set('Access-Control-Allow-Origin', 'http://loyid.online'); // if have a domain, setting option
  if (ctx.headers.referer && ctx.headers.referer.indexOf('localhost:4000') > -1) {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:4000');
  }
  ctx.set('Access-Control-Allow-Credentials', (true as any));
  return next();
}