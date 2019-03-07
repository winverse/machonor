import { Context } from 'koa';
import {
  FreePosts,
} from 'database/models';

export default class NoticePostsCtrl {
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
      posts = await FreePosts.getNoticeList(page);
    } catch (e) {
      ctx.throw(500, e);
    }
    ctx.body = {
      list: posts.rows,
      lastPage: posts.lastPage,
    };
  }
}