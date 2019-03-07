"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// returns 401 error if not authorized
exports.default = (ctx, next) => {
    if (!ctx.state.user) {
        ctx.status = 401;
        return;
    }
    return next();
};
//# sourceMappingURL=needsAuth.js.map