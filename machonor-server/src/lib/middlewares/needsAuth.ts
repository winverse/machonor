// @flow
import { Context } from 'koa';

// returns 401 error if not authorized
export default (ctx: Context, next: () => Promise<any>) => {
  if (!ctx.state.user) {
    ctx.status = 401;
    return;
  }
  return next();
};
