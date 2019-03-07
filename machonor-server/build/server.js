"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const Router = require("koa-router");
const koaBody = require("koa-body");
const path = require("path");
const serve = require("koa-static");
const ssr_1 = require("./ssr");
const database_1 = require("database");
const authToken_1 = require("lib/middlewares/authToken");
const crossOrigin_1 = require("lib/middlewares/crossOrigin");
const router_1 = require("router");
class Server {
    constructor() {
        this.initializeDB = () => {
            database_1.sequelize.authenticate().then(() => {
                database_1.sync();
                console.log('DB connection is established');
            }, (err) => {
                console.log(`Unable to connect to DB: ${err}`);
            });
        };
        this.routes = () => {
            const { router } = this;
            router.use('/api', router_1.default.routes());
        };
        this.middleware = () => {
            const { app, router } = this;
            const staticPath = path.join(__dirname, '../../webuy-client/build');
            const uploadPath = path.join(__dirname, '../');
            app.use(crossOrigin_1.default);
            app.use(koaBody());
            app.use(authToken_1.default);
            app.use(serve(uploadPath));
            app.use(router.routes()).use(router.allowedMethods());
            app.use(serve(staticPath));
            app.use(ssr_1.default);
        };
        this.listen = (port) => {
            const { app } = this;
            app.listen(port, () => {
                console.log(`server is running, port number is ${port}`);
            });
        };
        this.app = new Koa();
        this.router = new Router();
        this.initializeDB();
        this.routes();
        this.middleware();
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map