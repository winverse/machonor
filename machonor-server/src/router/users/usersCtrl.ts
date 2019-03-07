import { Context } from 'koa';
import * as Joi from 'joi';
import {
  User,
} from 'database/models';

export default class UsersCtrl {
  static check = async (ctx: Context) => {
    const { user } = ctx.state;
    if (!user) {
      ctx.status = 403; // Forbidden
      ctx.body = {
        name: 'FORBIDDEN',
      };
      return;
    }
    ctx.body = user.profile;
  }
  static logout = async (ctx: Context) => {
    ctx.cookies.set('access_token', null, {
      httpOnly: true,
      maxAge: 0,
    });
    ctx.status = 204;
  }
  static getUserInfo = async (ctx: Context) => {
    interface IParamsSchema {
      displayname: string;
    }
    const schema = Joi.object().keys({
      displayname: Joi.string().min(2).max(10),
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
    const { displayname }: IParamsSchema = ctx.params;
    let user: any = null;
    try {
      user = await User.findByDisplayname(displayname);
    } catch (e) {
      ctx.throw(500, e);
    }
    ctx.body = {
      userId: user.id,
      amount: user.UserProfile.amount,
      level: user.UserProfile.level,
    };
  }
}