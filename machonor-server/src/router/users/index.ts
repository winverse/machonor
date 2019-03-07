import * as Router from 'koa-router';

import usersCtrl from './usersCtrl';

export class UsersRouter {
  public users: Router;
  constructor() {
    this.users = new Router();
    this.routes();
  }
  public routes = (): void => {
    const { users } = this;
    users.post('/logout', usersCtrl.logout);
    users.get('/check', usersCtrl.check);
    users.get('/:displayname', usersCtrl.getUserInfo);
  }
}

const usersRouter = new UsersRouter();
const users = usersRouter.users;

export default users;