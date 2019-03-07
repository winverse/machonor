"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const core_1 = require("./core");
const auth_1 = require("./auth");
const posts_1 = require("./posts");
const users_1 = require("./users");
class ApiRouter {
    constructor() {
        this.routes = () => {
            const { api } = this;
            api.use('/core', core_1.default.routes());
            api.use('/auth', auth_1.default.routes());
            api.use('/posts', posts_1.default.routes());
            api.use('/users', users_1.default.routes());
        };
        this.api = new Router();
        this.routes();
    }
}
exports.ApiRouter = ApiRouter;
const apiRouter = new ApiRouter();
const api = apiRouter.api;
exports.default = api;
//# sourceMappingURL=index.js.map