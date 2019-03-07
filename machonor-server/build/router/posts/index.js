"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
const Router = require("koa-router");
const Multer = require("koa-multer");
const common_1 = require("lib/common");
const storage = Multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, common_1.formatFileName(file.originalname));
    }
});
const upload = Multer({ storage });
const needsAuth_1 = require("lib/middlewares/needsAuth");
const justicePostsCtrl_1 = require("./justicePostsCtrl");
const freePostsCtrl_1 = require("./freePostsCtrl");
const noticePostsCtrl_1 = require("./noticePostsCtrl");
const commentCtrl_1 = require("./commentCtrl");
class PostsRouter {
    constructor() {
        this.routes = () => {
            const { posts } = this;
            // list
            posts.get('/free', freePostsCtrl_1.default.getPostList);
            posts.get('/notice', noticePostsCtrl_1.default.getPostList);
            // 글
            posts.post('/justice/write', needsAuth_1.default, justicePostsCtrl_1.default.writePosts);
            posts.post('/upload', upload.single('upload'), justicePostsCtrl_1.default.imageUpload);
            posts.get('/free/:urlSlug', freePostsCtrl_1.default.readPost);
            posts.delete('/free/:urlSlug', freePostsCtrl_1.default.removePost);
            posts.post('/free/write', freePostsCtrl_1.default.writePosts);
            posts.get('/free/search/:criteria/:word', freePostsCtrl_1.default.searchPost);
            // 좋아요
            posts.post('/free/:postId/likes', freePostsCtrl_1.default.likePost);
            posts.delete('/free/:postId/likes', freePostsCtrl_1.default.unlikePost);
            // 댓글
            posts.post('/comments/write', commentCtrl_1.default.writeComment);
            posts.get('/comments/read/:postId/:order', commentCtrl_1.default.getCommentList);
            posts.delete('/comments/:commentId', commentCtrl_1.default.removeComment);
            // 좋아요
            posts.post('/comments/:commentId/likes', needsAuth_1.default, commentCtrl_1.default.like);
            posts.delete('/comments/:commentId/likes', needsAuth_1.default, commentCtrl_1.default.unLike);
        };
        this.posts = new Router();
        this.routes();
    }
}
exports.PostsRouter = PostsRouter;
const postsRouter = new PostsRouter();
const posts = postsRouter.posts;
exports.default = posts;
//# sourceMappingURL=index.js.map