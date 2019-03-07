"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const authCtrl_1 = require("./authCtrl");
class AuthRouter {
    constructor() {
        this.routes = () => {
            const { auth } = this;
            auth.post('/send-email-auth', authCtrl_1.default.emailAuth);
            auth.get('/exists/:key(userid|email|displayname)/:value', authCtrl_1.default.checkExists);
            auth.post('/register/local', authCtrl_1.default.localRegister);
            auth.post('/login/local', authCtrl_1.default.localLogin);
        };
        this.auth = new Router();
        this.routes();
    }
}
exports.AuthRouter = AuthRouter;
const authRouter = new AuthRouter();
const auth = authRouter.auth;
exports.default = auth;
//# sourceMappingURL=index.js.map