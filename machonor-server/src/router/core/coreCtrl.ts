import { Context } from 'koa';
import * as Joi from 'joi';
import { getIpCountry } from 'lib/getIp';

export default class CoreCtrl {
  static getLang = async (ctx: Context) => {
    let result: any;
    try {
      result = await getIpCountry();
    } catch (e) {
      ctx.throw(500, e);
    }
    let lang;
    if (result === 'KR') {
      lang = 'ko';
    } else {
      lang = 'en';
    }
    ctx.body = lang;
  }
}