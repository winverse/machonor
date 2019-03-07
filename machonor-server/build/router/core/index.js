"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const coreCtrl_1 = require("./coreCtrl");
class CoreRouter {
    constructor() {
        this.routes = () => {
            const { core } = this;
            core.get('/lang', coreCtrl_1.default.getLang);
        };
        this.core = new Router();
        this.routes();
    }
}
exports.CoreRouter = CoreRouter;
const coreRouter = new CoreRouter();
const core = coreRouter.core;
exports.default = core;
//# sourceMappingURL=index.js.map