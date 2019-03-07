import { Context } from 'koa';
import * as Joi from 'joi';

import {
  User,
  UserProfile,
} from 'database/models';

export default class AuthCtrl {
  static emailAuth = (ctx: Context) => {
    interface IBodySchema {
      email: string;
    }

    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
    });

    const result: Joi.ValidationResult<string> = Joi.validate(ctx.request.body, schema);

    if (result.error) {
      ctx.status = 400;
      ctx.body = {
        name: 'WRONG_SCHEMA',
        payload: result.error,
      };
      return;
    }
    ctx.body = ctx.request.body;
  }

  static checkExists = async (ctx: Context) => {
    const { key, value } = ctx.params;
    const schema = Joi.object().keys({
      key: Joi.string().required(),
      value: Joi.string().required(),
    });

    const result: Joi.ValidationResult<string> = Joi.validate(ctx.params, schema);

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
      account = await (key === 'email' ? User.findByEmail(value) :
      (key === 'displayname' ? User.findByDisplayname(value) : User.findByUserId(value)));
    } catch (e) {
      ctx.throw(500, e);
    }
    ctx.body = {
      exists: !!account,
    };
  }

  static localRegister = async(ctx: Context) => {
    interface IBodySchema {
      userid: string;
      password: string;
      displayname: string;
      email: string;
    }
    const {
      userid,
      displayname,
      email,
      password,
    }: IBodySchema = ctx.request.body;

    const schema = Joi.object().keys({
      userid: Joi.string().required().max(10).min(3),
      displayname: Joi.string().min(2).max(10).required(),
      password: Joi.string().min(6).max(100).required(),
      email: Joi.string().email().required(),
    });

    const result: Joi.ValidationResult<string> = Joi.validate(ctx.request.body, schema);
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
      existEmail = await User.findByEmail(email);
      existUserid = await User.findByUserId(userid);
      existDisplayname = await User.findByDisplayname(displayname);
    } catch (e) {
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
    let userProfile: any;
    try {
      user = await User.localRegister({ email, password, userid });
      userProfile = await UserProfile.localRegister({ displayname, fk_user_id: user.id });
    } catch (e) {
      ctx.throw(500, e);
    }
    let token: string;
    try {
      token = await User.generatorToken({
        instance: userProfile,
        id: user.id,
      });
    } catch (e) {
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
  }

  static localLogin = async (ctx: Context) => {
    interface IBodySchema {
      userid: string;
      password: string;
    }
    const schema = Joi.object().keys({
      userid: Joi.string().max(10).min(3).required(),
      password: Joi.string().min(6).max(100).required(),
    });
    const result: Joi.ValidationResult<string> = Joi.validate(ctx.request.body, schema);
    if (result.error) {
      ctx.status = 400; // BadRequest
      ctx.body = {
        name: 'WRONG_SCHEMA',
        messgae: result.error,
      };
      return;
    }
    const { userid, password }: IBodySchema = ctx.request.body;
    let account: any = null;
    try {
      account = await User.findByUserId(userid);
    } catch (e) {
      ctx.throw(500, e);
    }
    if (!account) {
      ctx.status = 404;
      return;
    }
    let validate: boolean;
    try {
      validate = await User.validatePassword({ password, instance: account });
    } catch (e) {
      ctx.throw(500, e);
    }
    if (!validate) {
      ctx.status = 403;
      return;
    }
    let token: string;
    try {
      token = await User.generatorToken({ instance: account.UserProfile, id: account.id });
    } catch (e) {
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
  }
}