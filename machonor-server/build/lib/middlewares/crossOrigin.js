"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function async(ctx, next) {
    ctx.set('Access-Control-Allow-Origin', 'http://loyid.online'); // if have a domain, setting option
    if (ctx.headers.referer && ctx.headers.referer.indexOf('localhost:4000') > -1) {
        ctx.set('Access-Control-Allow-Origin', 'http://localhost:4000');
    }
    ctx.set('Access-Control-Allow-Credentials', true);
    return next();
}
exports.default = async;
//# sourceMappingURL=crossOrigin.js.map