"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("lib/token");
exports.default = async (ctx, next) => {
    const token = ctx.cookies.get('access_token');
    if (!token) {
        ctx.state.user = null;
        return next();
    }
    let decoded;
    try {
        decoded = await token_1.decodedToken(token);
        if (Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
            const { _id, level, amount, profile } = decoded;
            console.log(decoded);
            const freshToken = await token_1.generateToken({
                payload: {
                    _id,
                    amount,
                    level,
                    profile,
                },
                subject: 'account',
            });
            ctx.cookies.set('access_token', freshToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 34 * 7,
            });
        }
    }
    catch (e) {
        ctx.throw(500, e);
        ctx.state.user = null;
    }
    ctx.state.user = decoded;
    return next();
};
//# sourceMappingURL=authToken.js.map