"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("database/models");
class NoticePostsCtrl {
}
NoticePostsCtrl.getPostList = async (ctx) => {
    const page = parseInt(ctx.query.page || 1, 10);
    if (page < 1) {
        ctx.status = 400;
        ctx.body = {
            name: 'WRONG_PAGE',
        };
        return;
    }
    let posts = null;
    try {
        posts = await models_1.FreePosts.getNoticeList(page);
    }
    catch (e) {
        ctx.throw(500, e);
    }
    ctx.body = {
        list: posts.rows,
        lastPage: posts.lastPage,
    };
};
exports.default = NoticePostsCtrl;
//# sourceMappingURL=noticePostsCtrl.js.map