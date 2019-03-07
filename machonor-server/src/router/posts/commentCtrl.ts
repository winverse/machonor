import { Context } from 'koa';
import * as Joi from 'joi';
import { getIpAddress } from 'lib/getIp';
import * as Redis from 'redis';
import { promisify } from 'util';

import {
  FreeComments,
  FreeCommentLike,
} from 'database/models';

export default class CommentCtrl {
  static writeComment = async (ctx: Context) => {
    const client = Redis.createClient();
    interface IBodySchema {
      text: string;
      postId?: string;
      displayname: string;
      password: string;
      replyTo: string;
      commentId?: string;
    }
    const schema = Joi.object().keys({
      text: Joi.string().min(1).max(500).required(),
      postId: Joi.string().uuid().optional(),
      displayname: Joi.string().min(2).max(10).allow('').optional(),
      password: Joi.string().min(0).max(30).allow('').optional(),
      replyTo: Joi.string().uuid().optional(),
      commentId: Joi.string().uuid().optional(),
    });
    const result: Joi.ValidationResult<string> = Joi.validate(ctx.request.body, schema);
    if (result.error) {
      ctx.status = 400; // BadRequest;
      ctx.body = {
        name: 'WRONG_SCHEMA',
      };
      return;
    }
    const { text, postId, displayname, password, replyTo, commentId }: IBodySchema = ctx.request.body;
    const user = ctx.state.user && ctx.state.user;
    let ip: any;
    try {
      ip = await getIpAddress();
    } catch (e) {
      ctx.throw(500, e);
    }
    const getAsync = promisify(client.get).bind(client);
    let getRedis: any = null;
    try {
      getRedis = await getAsync(ip);
    } catch (e) {
      ctx.throw(500, e);
    }
    if (getRedis) {
      ctx.status = 406;
      ctx.body = {
        name: 'ALREADY_EXISTS',
      };
      return;
    }
    if (!getRedis) {
      client.set(ip, ip, 'EX', 10);
    }
    if (commentId) {
      let comment: any = null;
      try {
        comment = await FreeComments.commentTextUpdate({
          password,
          commentId,
          text,
          displayname: displayname ? displayname : user.profile.displayname,
        });
      } catch (e) {
        ctx.throw(500, e);
      }
      ctx.body = {
        commentId,
        comment,
      };
      return;
    }
    if (replyTo) { // 부모 댓글의 hasReply 컬럼 상태를 업데이트 해준다.
      let comment: any = null;
      try {
        comment = await FreeComments.hasReplyUpdate(replyTo);
      } catch (e) {
        ctx.throw(500, e);
      }
      if (!comment) {
        ctx.status = 404;
        ctx.body = {
          name: 'COMMENT_NOT_FOUND',
        };
        return;
      }
    }
    const ipCollection = [];
    ip.split('.').slice(0, 2).map((address) => {
      ipCollection.push(address);
    });
    let parseIp = ipCollection.join('.');
    let comment: any = null;
    try {
      comment = await FreeComments.writeComment({
        text,
        postId,
        password,
        replyTo,
        displayname: displayname || user.profile.displayname,
        userId: user && user._id,
        anonymous: user ? false : true,
        level: replyTo ? 1 : 0,
        ipAddress: parseIp,
      });
    } catch (e) {
      ctx.throw(500, e);
    }
    try {
      comment = await FreeComments.findById(comment.id);
    } catch (e) {
      ctx.throw(500, e);
    }
    if (!comment) return;
    ctx.body = comment;
  }
  static removeComment = async (ctx: Context) => {
    interface IParamsSchema {
      commentId: string;
    }
    const schema = Joi.object().keys({
      commentId: Joi.string().uuid().required(),
    });
    const result: Joi.ValidationResult<string> = Joi.validate(ctx.params, schema);
    if (result.error) {
      ctx.status = 400; // BadRequest
      ctx.body = {
        name: 'WRONG_SCHEMA',
        messgae: result.error,
      };
      return;
    }
    const { commentId }: IParamsSchema = ctx.params;
    let comment: any = null;
    try {
      comment = await FreeComments.commentRemove({ commentId });
    } catch (e) {
      ctx.throw(500, e);
    }
    if (!comment) {
      ctx.status = 404; // NOT_FOUND
      ctx.body = {
        name: 'NOT_FOUND_COMMENT',
        messgae: result.error,
      };
      return;
    }
    if (!comment.anonymous) {
      const userId = ctx.state && ctx.state.user._id;
      const { fk_user_id } = comment;
      if (userId !== fk_user_id) {
        ctx.status = 401;
        ctx.body = {
          name: 'UNAUTHENTICATED',
        };
        return;
      }
    }
    ctx.body = comment;
  }
  static getCommentList = async (ctx: Context) => {
    interface IParamsSchema {
      postId: string;
      order: 'popular' | 'recently' | 'past';
    }
    const schema = Joi.object().keys({
      postId: Joi.string().uuid().required(),
      order: Joi.string().max(10).allow('popular').allow('recently').allow('past').required(),
    });
    const result: Joi.ValidationResult<string> = Joi.validate(ctx.params, schema);
    if (result.error) {
      ctx.status = 400; // BadRequest
      ctx.body = {
        name: 'WRONG_SCHEMA',
        messgae: result.error,
      };
      return;
    }
    const { order, postId }: IParamsSchema = ctx.params;
    let list: any = null;
    try {
      list = await FreeComments.listComments({
        postId,
        order: order || 'popular',
      });
    } catch (e) {
      ctx.throw(500, e);
    }
    let { rows , count } = list; // rows: 글의 댓글 목록
    async function checkLiked(post: any): Promise<any> {
      const userId = ctx.state.user && ctx.state.user._id; // 현재 로그인한 계정 id
      const commentId = post.id; // 댓글의 id,
      let like: any = null;
      if (userId) {
        try {
          // 현재 로그인한 계정이 댓글에 좋아요를 했는지 체크한다.
          like = await FreeCommentLike.checkExists({ userId, commentId });
        } catch (e) {
          ctx.throw(500, e);
        }
      }
      // 로그인 상태이면서 like값이 있다면 true 그렇지 않으면 liked값에 false를 준다.
      const checkLike = (userId !== null && like) ? true : false;
      const checked = Object.assign(post, { liked: checkLike });
      return checked;
    }
    rows = rows.map(checkLiked);
    await Promise.all(rows).then((data) => {
      ctx.body = {
        count,
        rows: data,
      };
    });
  }
  static like = async (ctx: Context) => { // 좋아요를 누르면 likesCount값을 올린다
    interface IParamsSchema {
      commentId: string;
    }
    const schema = Joi.object().keys({
      commentId: Joi.string().uuid().required(),
    });
    const result: Joi.ValidationResult<string> = Joi.validate(ctx.params, schema);
    if (result.error) {
      ctx.status = 400; // BadRequest
      ctx.body = {
        name: 'WRONG_SCHEMA',
        messgae: result.error,
      };
      return;
    }
    const { commentId }: IParamsSchema = ctx.params;
    const { _id: userId } = ctx.state.user;
    if (!userId) {
      ctx.status = 403;
      ctx.body = {
        name: 'FORBIDDEN',
      };
      return;
    }
    try {
      await FreeCommentLike.createLike({
        userId,
        commentId,
      });
    } catch (e) {
      ctx.throw(500, e);
    }
    try {
      await FreeComments.commentCountUpdate({ commentId, add: 1 });
    } catch (e) {
      ctx.throw(500, e);
    }
    let likesCount: any = null;
    try {
      likesCount = await FreeCommentLike.findByIdCount(commentId);
    } catch (e) {
      ctx.throw(500, e);
    }
    ctx.body = {
      likesCount,
    };
  }
  static unLike = async (ctx: Context) => { // 좋아요를 누르면 likesCount값을 내린다.
    interface IParamsSchema {
      commentId: string;
    }
    const schema = Joi.object().keys({
      commentId: Joi.string().uuid().required(),
    });
    const result: Joi.ValidationResult<string> = Joi.validate(ctx.params, schema);
    if (result.error) {
      ctx.status = 400; // BadRequest
      ctx.body = {
        name: 'WRONG_SCHEMA',
      };
      return;
    }
    const { commentId }: IParamsSchema = ctx.params;
    const { _id: userId } = ctx.state.user;
    if (!userId) {
      ctx.status = 403;
      ctx.body = {
        name: 'FORBIDDEN',
      };
      return;
    }
    try {
      await FreeCommentLike.deletedLike({
        userId,
        commentId,
      });
    } catch (e) {
      ctx.throw(500, e);
    }
    try {
      await FreeComments.commentCountUpdate({ commentId, add: -1 });
    } catch (e) {
      ctx.throw(500, e);
    }
    let likesCount: any = null;
    try {
      likesCount = await FreeCommentLike.findByIdCount(commentId);
    } catch (e) {
      ctx.throw(500, e);
    }
    ctx.body = {
      likesCount,
    };
  }
}