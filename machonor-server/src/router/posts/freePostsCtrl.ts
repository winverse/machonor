import { Context } from 'koa';
import { getIpAddress } from 'lib/getIp';
import { escapeForUrl, generateSlugId } from 'lib/common';
import * as Joi from 'joi';

import {
  FreePosts,
  FreePostLike,
  FreeComments,
} from 'database/models';

export default class FreePostsCtrl {
  static getPostList = async (ctx: Context) => {
    const page = parseInt(ctx.query.page || 1, 10);
    if (page < 1) {
      ctx.status = 400;
      ctx.body = {
        name: 'WRONG_PAGE',
      };
      return;
    }
    let posts: any = null;
    try {
      posts = await FreePosts.getPostsList(page);
    } catch (e) {
      ctx.throw(500, e);
    }
    async function checkCoutingComemnt(post: any): Promise<any> {
      const parsePost = post.toJSON();
      const postId = parsePost.id;
      let commentsCount: any = null;
      try {
        commentsCount = await FreeComments.checkCommentCount(postId);
      } catch (e) {
        ctx.throw(500, e);
      }
      let likesCount: any = null;
      try {
        likesCount = await FreePostLike.postLikesCount(postId);
      } catch (e) {
        ctx.throw(500, e);
      }
      const count = { commentsCount, likesCount };
      const result = Object.assign(parsePost, count);
      return result;
    }
    const data = posts.rows.map(checkCoutingComemnt);
    await Promise.all(data).then((list) => {
      ctx.body = {
        list,
        lastPage: posts.lastPage,
      };
    });
  }
  static writePosts = async (ctx: Context) => {
    interface IBodySchema {
      title: string;
      displayname?: string;
      password?: string;
      body: string;
      anonymous: boolean;
      postId?: string | null;
    }
    const schema = Joi.object().keys({
      title: Joi.string().min(1).max(100).required(),
      displayname: Joi.string().min(2).max(10).allow('').optional(),
      password: Joi.string().min(0).max(30).allow('').optional(),
      body: Joi.string().min(1).required(),
      anonymous: Joi.boolean().required(),
      postId: Joi.string().allow('').allow(null).optional(),
    });
    const result: Joi.ValidationResult<string> = Joi.validate(ctx.request.body, schema);
    if (result.error) {
      ctx.status = 400; // BadRequest
      ctx.body = {
        name: 'WRONG_SCHEMA',
        messgae: result.error,
      };
      console.log(result.error);
      return;
    }
    let ip: any;
    try {
      ip = await getIpAddress();
    } catch (e) {
      ctx.throw(500, e);
    }
    const ipCollection = [];
    ip.split('.').slice(0, 2).map((address) => {
      ipCollection.push(address);
    });
    let parseIp = ipCollection.join('.');
    const { anonymous, body, password, title, displayname, postId }: IBodySchema = ctx.request.body;
    const uniqueUrlSlug = escapeForUrl(`${title} ${generateSlugId()}`);
    if (postId) { // 수정
      let post: any;
      try {
        await FreePosts.postUpdate({
          displayname,
          password,
          postId,
          body,
          title,
          urlSlug: uniqueUrlSlug,
        });
      } catch (e) {
        ctx.throw(500, e);
      }
      try {
        post = await FreePosts.findPostById(postId);
      } catch (e) {
        ctx.throw(500, e);
      }
      let liked: boolean = false;
      const userId = ctx.state.user && ctx.state.user._id;
      if (userId) {
        try {
          liked = await FreePostLike.checkExists({
            userId,
            postId: post.id,
          });
        } catch (e) {
          ctx.throw(500, e);
        }
      }
      post = Object.assign(post, { liked });
      ctx.body = post;
      return;
    }
    const stateUsername = ctx.state.user && ctx.state.user.profile.displayname;
    let post: any;
    try {
      post = await FreePosts.postsWrite({
        title,
        body,
        anonymous,
        urlSlug: uniqueUrlSlug,
        password: anonymous === true ? password : null,
        displayname: anonymous === true ? displayname : stateUsername,
        ipAddress: parseIp,
        fk_user_id: anonymous === true ? null : ctx.state.user._id,
      });
    } catch (e) {
      ctx.throw(500, e);
    }
    let data: any;
    try {
      data = await FreePosts.findPostById(post.id);
    } catch (e) {
      ctx.throw(500, e);
    }
    Object.assign(data, { liked: false });
    ctx.body = data;
  }
  static readPost = async (ctx: Context) => {
    interface IBodySchema {
      urlSlug: string;
    }
    const schema = Joi.object().keys({
      urlSlug: Joi.string().required(),
    });
    const result: Joi.ValidationResult<string> = Joi.validate(ctx.params, schema);
    if (result.error) {
      console.log(result.error);
      ctx.status = 400; // BadRequest;
      ctx.body = {
        name: 'WRONG_SCHEMA',
      };
      return;
    }
    const { urlSlug }: IBodySchema = ctx.params;
    let post: any = null;
    try {
      post = await FreePosts.readPost(urlSlug);
    } catch (e) {
      ctx.throw(500, e);
    }
    if (!post) {
      ctx.status = 404; // NOT found;
      return;
    }
    try {
      await FreePosts.updateViewsCount({
        postId: post.id,
        totalViews: post.totalViews,
      });
    } catch (e) {
      ctx.throw(500, e);
    }
    let likesCount: any = null;
    try {
      likesCount = await FreePostLike.postLikesCount(post.id);
    } catch (e) {
      ctx.throw(500, e);
    }
    let liked: boolean = false;
    const userId = ctx.state.user && ctx.state.user._id;
    if (userId) {
      try {
        liked = await FreePostLike.checkExists({
          userId,
          postId: post.id,
        });
      } catch (e) {
        ctx.throw(500, e);
      }
    }
    post = Object.assign(post, { likesCount, liked });
    ctx.body = post;
  }
  static removePost = async (ctx: Context) => {
    interface IParamSchema {
      urlSlug: string;
    }
    const schema = Joi.object().keys({
      urlSlug: Joi.string().required(),
    });
    const result: Joi.ValidationResult<string> = Joi.validate(ctx.params, schema);
    if (result.error) {
      console.log(result.error);
      ctx.status = 400; // BadRequest;
      ctx.body = {
        name: 'WRONG_SCHEMA',
      };
      return;
    }
    const { urlSlug }: IParamSchema = ctx.params;
    let post: any = null;
    try {
      post = await FreePosts.findByUrlslug(urlSlug);
      if (!post) {
        ctx.status = 404;
        ctx.body = {
          name: 'NOT_FOUND',
        };
        return;
      }
      if (!post.anonymous) {
        const { _id: userId } = ctx.state.user;
        if (userId) {
          const checkOwnPost = post.User.id === userId;
          if (!checkOwnPost) {
            ctx.status = 401;
            ctx.body = {
              name: 'UNAUTHENTICATED',
            };
            return;
          }
        }
      }
      try {
        await FreePosts.removePost(post.id);
        await FreeComments.commentRemove({ postId: post.id });
        ctx.status = 204;
      } catch (e) {
        ctx.throw(500, e);
      }
    } catch (e) {
      ctx.throw(500, e);
    }
  }
  static likePost = async(ctx: Context) => {
    interface IParamsSchema {
      postId: string;
    }
    const schema = Joi.object().keys({
      postId: Joi.string().uuid().required(),
    });
    const result: Joi.ValidationResult<string> = Joi.validate(ctx.params, schema);
    if (result.error) {
      ctx.status = 400; // BadRequest
      ctx.body = {
        name: 'WRONG_SCHEMA',
      };
      return;
    }
    const { postId }: IParamsSchema = ctx.params;
    const { _id: userId } = ctx.state.user;
    if (!userId) {
      ctx.status = 403; // forbidden
      ctx.body = {
        name: 'FORBIDDEN',
      };
      return;
    }
    try {
      await FreePostLike.createLike({
        userId,
        postId,
      });
    } catch (e) {
      ctx.throw(500, e);
    }
    let likesCount: any = null;
    try {
      likesCount = await FreePostLike.postLikesCount(postId);
    } catch (e) {
      ctx.throw(500, e);
    }
    ctx.body = likesCount;
  }
  static unlikePost = async (ctx: Context) => {
    interface IParamsSchema {
      postId: string;
    }
    const schema = Joi.object().keys({
      postId: Joi.string().uuid().required(),
    });
    const result: Joi.ValidationResult<string> = Joi.validate(ctx.params, schema);
    if (result.error) {
      ctx.status = 400; // BadRequest
      ctx.body = {
        name: 'WRONG_SCHEMA',
      };
      return;
    }
    const { postId }: IParamsSchema = ctx.params;
    const { _id: userId } = ctx.state.user;
    if (!userId) {
      ctx.status = 403;
      ctx.body = {
        name: 'FORBIDDEN',
      };
      return;
    }
    try {
      await FreePostLike.deletedLike({
        postId,
        userId,
      });
    } catch (e) {
      ctx.throw(500, e);
    }
    let likesCount: any = null;
    try {
      likesCount = await FreePostLike.postLikesCount(postId);
    } catch (e) {
      ctx.throw(500, e);
    }
    ctx.body = likesCount;
  }
  static searchPost = async (ctx: Context) => {
    interface IParamsSchema {
      criteria: string;
      word: string;
    }
    const schema = Joi.object().keys({
      criteria: Joi.string().required(),
      word: Joi.string().min(2).max(10).required(),
    });
    const result: Joi.ValidationResult<string> = Joi.validate(ctx.params, schema);
    if (result.error) {
      ctx.status = 400; // BadRequest
      ctx.body = {
        name: 'WRONG_PARAMS',
      };
      return;
    }
    const { criteria, word }: IParamsSchema = ctx.params;
    const page = parseInt(ctx.query.page || 1, 10);
    if (page < 1) {
      ctx.status = 400;
      ctx.body = {
        name: 'WRONG_PAGE',
      };
      return;
    }
    let posts: any = null;
    try {
      posts = await FreePosts.searchPost({ criteria, word, page });
    } catch (e) {
      ctx.throw(500, e);
    }
    async function checkCoutingComemnt(post: any): Promise<any> {
      if (!post) return;
      const parsePost = post.toJSON();
      const postId = parsePost.id;
      let commentsCount: any = null;
      try {
        commentsCount = await FreeComments.checkCommentCount(postId);
      } catch (e) {
        ctx.throw(500, e);
      }
      let likesCount: any = null;
      try {
        likesCount = await FreePostLike.postLikesCount(postId);
      } catch (e) {
        ctx.throw(500, e);
      }
      const count = { commentsCount, likesCount };
      const result = Object.assign(parsePost, count);
      return result;
    }
    const data = posts.rows.map(checkCoutingComemnt);
    await Promise.all(data).then((list) => {
      ctx.body = {
        list: list ? list : [],
        lastPage: posts.lastPage,
      };
    });
  }
}