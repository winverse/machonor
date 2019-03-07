import * as Router from 'koa-router';

import authCtrl from './authCtrl';

export class AuthRouter {
  public auth: Router;

  constructor() {
    this.auth = new Router();
    this.routes();
  }

  public routes = (): void => {
    const { auth } = this;
    auth.post('/send-email-auth', authCtrl.emailAuth);
    auth.get('/exists/:key(userid|email|displayname)/:value', authCtrl.checkExists);
    auth.post('/register/local', authCtrl.localRegister);
    auth.post('/login/local', authCtrl.localLogin);
  }
}

const authRouter = new AuthRouter();
const auth = authRouter.auth;

export default auth;