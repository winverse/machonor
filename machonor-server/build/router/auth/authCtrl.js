"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const models_1 = require("database/models");
class AuthCtrl {
}
AuthCtrl.emailAuth = (ctx) => {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
    });
    const result = Joi.validate(ctx.request.body, schema);
    if (result.error) {
        ctx.status = 400;
        ctx.body = {
            name: 'WRONG_SCHEMA',
            payload: result.error,
        };
        return;
    }
    ctx.body = ctx.request.body;
};
AuthCtrl.checkExists = async (ctx) => {
    const { key, value } = ctx.params;
    const schema = Joi.object().keys({
        key: Joi.string().required(),
        value: Joi.string().required(),
    });
    const result = Joi.validate(ctx.params, schema);
    if (result.error) {
        ctx.status = 400; // Bad Request;
        ctx.body = {
            name: 'WRONG_SCHEMA',
            messgae: result.error,
        };
        console.log(result.error);
        return;
    }
    let account = null;
    try {
        account = await (key === 'email' ? models_1.User.findByEmail(value) :
            (key === 'displayname' ? models_1.User.findByDisplayname(value) : models_1.User.findByUserId(value)));
    }
    catch (e) {
        ctx.throw(500, e);
    }
    ctx.body = {
        exists: !!account,
    };
};
AuthCtrl.localRegister = async (ctx) => {
    const { userid, displayname, email, password, } = ctx.request.body;
    const schema = Joi.object().keys({
        userid: Joi.string().required().max(10).min(3),
        displayname: Joi.string().min(2).max(10).required(),
        password: Joi.string().min(6).max(100).required(),
        email: Joi.string().email().required(),
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
    let existEmail;
    let existUserid;
    let existDisplayname;
    try {
        existEmail = await models_1.User.findByEmail(email);
        existUserid = await models_1.User.findByUserId(userid);
        existDisplayname = await models_1.User.findByDisplayname(displayname);
    }
    catch (e) {
        ctx.throw(500, e);
    }
    if (existDisplayname || existEmail || existUserid) {
        ctx.status = 409; // Conflict
        ctx.body = {
            name: (existEmail ? 'EMAIL_EXISTS' : (existUserid ? 'USERID_EXISTS' : 'DISPLAYNAME_EXISTS')),
            key: (existEmail ? 'email' : (existUserid ? 'userid' : 'displayname')),
        };
        return;
    }
    let user;
    let userProfile;
    try {
        user = await models_1.User.localRegister({ email, password, userid });
        userProfile = await models_1.UserProfile.localRegister({ displayname, fk_user_id: user.id });
    }
    catch (e) {
        ctx.throw(500, e);
    }
    let token;
    try {
        token = await models_1.User.generatorToken({
            instance: userProfile,
            id: user.id,
        });
    }
    catch (e) {
        ctx.throw(500, e);
    }
    console.log(token);
    ctx.cookies.set('access_token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    ctx.body = {
        userId: user.id,
        displayname: userProfile.displayname,
        thumbnail: userProfile.thumbnail || null,
        shortBio: userProfile.shortBio || null,
        amount: userProfile.amount,
        level: userProfile.level,
    };
};
AuthCtrl.localLogin = async (ctx) => {
    const schema = Joi.object().keys({
        userid: Joi.string().max(10).min(3).required(),
        password: Joi.string().min(6).max(100).required(),
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
    const { userid, password } = ctx.request.body;
    let account = null;
    try {
        account = await models_1.User.findByUserId(userid);
    }
    catch (e) {
        ctx.throw(500, e);
    }
    if (!account) {
        ctx.status = 404;
        return;
    }
    let validate;
    try {
        validate = await models_1.User.validatePassword({ password, instance: account });
    }
    catch (e) {
        ctx.throw(500, e);
    }
    if (!validate) {
        ctx.status = 403;
        return;
    }
    let token;
    try {
        token = await models_1.User.generatorToken({ instance: account.UserProfile, id: account.id });
    }
    catch (e) {
        ctx.throw(500, e);
    }
    ctx.cookies.set('access_token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    const userProfile = account.UserProfile;
    ctx.body = {
        userId: userProfile.fk_user_id,
        displayname: userProfile.displayname,
        thumbnail: userProfile.thumbnail,
        shortBio: userProfile.shortBio,
        amount: userProfile.amount,
        level: userProfile.level,
    };
};
exports.default = AuthCtrl;
//# sourceMappingURL=authCtrl.js.map