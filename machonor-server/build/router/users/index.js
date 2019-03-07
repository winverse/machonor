"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const usersCtrl_1 = require("./usersCtrl");
class UsersRouter {
    constructor() {
        this.routes = () => {
            const { users } = this;
            users.post('/logout', usersCtrl_1.default.logout);
            users.get('/check', usersCtrl_1.default.check);
            users.get('/:displayname', usersCtrl_1.default.getUserInfo);
        };
        this.users = new Router();
        this.routes();
    }
}
exports.UsersRouter = UsersRouter;
const usersRouter = new UsersRouter();
const users = usersRouter.users;
exports.default = users;
//# sourceMappingURL=index.js.map