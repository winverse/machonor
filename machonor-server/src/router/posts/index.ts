/* tslint:disable */
import * as Router from 'koa-router';
import * as Multer from 'koa-multer';
import * as Sharp from 'sharp';

import { formatFileName } from 'lib/common';

const storage = Multer.diskStorage({
    destination : function (req, file, callback) {
        callback(null, './public/uploads/' );
    },
    filename : function (req, file, callback) {
      callback(null, formatFileName(file.originalname) );
    }
});

const upload = Multer({ storage });

import needsAuth from 'lib/middlewares/needsAuth';

import justicePostsCtrl from './justicePostsCtrl';
import freePostsCtrl from './freePostsCtrl';
import noticePostsCtrl from './noticePostsCtrl';
import commentCtrl from './commentCtrl';

export class PostsRouter {
  public posts: Router;

  constructor() {
    this.posts = new Router();
    this.routes();
  }

  public routes = (): void => {
    const { posts } = this;
    // list
    posts.get('/free', freePostsCtrl.getPostList);
    posts.get('/notice', noticePostsCtrl.getPostList);
    // 글
    posts.post('/justice/write', needsAuth, justicePostsCtrl.writePosts);
    posts.post('/upload', upload.single('upload'), justicePostsCtrl.imageUpload);
    posts.get('/free/:urlSlug', freePostsCtrl.readPost);
    posts.delete('/free/:urlSlug', freePostsCtrl.removePost);
    posts.post('/free/write', freePostsCtrl.writePosts);
    posts.get('/free/search/:criteria/:word', freePostsCtrl.searchPost);
    // 좋아요
    posts.post('/free/:postId/likes', freePostsCtrl.likePost);
    posts.delete('/free/:postId/likes', freePostsCtrl.unlikePost);
    // 댓글
    posts.post('/comments/write', commentCtrl.writeComment);
    posts.get('/comments/read/:postId/:order', commentCtrl.getCommentList);
    posts.delete('/comments/:commentId', commentCtrl.removeComment);
    // 좋아요
    posts.post('/comments/:commentId/likes', needsAuth, commentCtrl.like);
    posts.delete('/comments/:commentId/likes', needsAuth, commentCtrl.unLike);
  }
}

const postsRouter = new PostsRouter();
const posts = postsRouter.posts;

export default posts;