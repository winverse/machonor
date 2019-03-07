"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const models_1 = require("database/models");
class UsersCtrl {
}
UsersCtrl.check = async (ctx) => {
    const { user } = ctx.state;
    if (!user) {
        ctx.status = 403; // Forbidden
        ctx.body = {
            name: 'FORBIDDEN',
        };
        return;
    }
    ctx.body = user.profile;
};
UsersCtrl.logout = async (ctx) => {
    ctx.cookies.set('access_token', null, {
        httpOnly: true,
        maxAge: 0,
    });
    ctx.status = 204;
};
UsersCtrl.getUserInfo = async (ctx) => {
    const schema = Joi.object().keys({
        displayname: Joi.string().min(2).max(10),
    });
    const result = Joi.validate(ctx.request.body, schema);
    if (result.error) {
        ctx.status = 400; // BadRequest
        ctx.body = {
            name: 'WRONG_SCHEMA',
            messgae: result.error,
        };
        return;
    }
    const { displayname } = ctx.params;
    let user = null;
    try {
        user = await models_1.User.findByDisplayname(displayname);
    }
    catch (e) {
        ctx.throw(500, e);
    }
    ctx.body = {
        userId: user.id,
        amount: user.UserProfile.amount,
        level: user.UserProfile.level,
    };
};
exports.default = UsersCtrl;
//# sourceMappingURL=usersCtrl.js.map