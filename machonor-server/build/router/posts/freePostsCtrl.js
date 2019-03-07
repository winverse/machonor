"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getIp_1 = require("lib/getIp");
const common_1 = require("lib/common");
const Joi = require("joi");
const models_1 = require("database/models");
class FreePostsCtrl {
}
FreePostsCtrl.getPostList = async (ctx) => {
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
        posts = await models_1.FreePosts.getPostsList(page);
    }
    catch (e) {
        ctx.throw(500, e);
    }
    async function checkCoutingComemnt(post) {
        const parsePost = post.toJSON();
        const postId = parsePost.id;
        let commentsCount = null;
        try {
            commentsCount = await models_1.FreeComments.checkCommentCount(postId);
        }
        catch (e) {
            ctx.throw(500, e);
        }
        let likesCount = null;
        try {
            likesCount = await models_1.FreePostLike.postLikesCount(postId);
        }
        catch (e) {
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
};
FreePostsCtrl.writePosts = async (ctx) => {
    const schema = Joi.object().keys({
        title: Joi.string().min(1).max(100).required(),
        displayname: Joi.string().min(2).max(10).allow('').optional(),
        password: Joi.string().min(0).max(30).allow('').optional(),
        body: Joi.string().min(1).required(),
        anonymous: Joi.boolean().required(),
        postId: Joi.string().allow('').allow(null).optional(),
    });
    const result = Joi.validate(ctx.request.body, schema);
    if (result.error) {
        ctx.status = 400; // BadRequest
        ctx.body = {
            name: 'WRONG_SCHEMA',
            messgae: result.error,
        };
        console.log(result.error);
        return;
    }
    let ip;
    try {
        ip = await getIp_1.getIpAddress();
    }
    catch (e) {
        ctx.throw(500, e);
    }
    const ipCollection = [];
    ip.split('.').slice(0, 2).map((address) => {
        ipCollection.push(address);
    });
    let parseIp = ipCollection.join('.');
    const { anonymous, body, password, title, displayname, postId } = ctx.request.body;
    const uniqueUrlSlug = common_1.escapeForUrl(`${title} ${common_1.generateSlugId()}`);
    if (postId) { // 수정
        let post;
        try {
            await models_1.FreePosts.postUpdate({
                displayname,
                password,
                postId,
                body,
                title,
                urlSlug: uniqueUrlSlug,
            });
        }
        catch (e) {
            ctx.throw(500, e);
        }
        try {
            post = await models_1.FreePosts.findPostById(postId);
        }
        catch (e) {
            ctx.throw(500, e);
        }
        let liked = false;
        const userId = ctx.state.user && ctx.state.user._id;
        if (userId) {
            try {
                liked = await models_1.FreePostLike.checkExists({
                    userId,
                    postId: post.id,
                });
            }
            catch (e) {
                ctx.throw(500, e);
            }
        }
        post = Object.assign(post, { liked });
        ctx.body = post;
        return;
    }
    const stateUsername = ctx.state.user && ctx.state.user.profile.displayname;
    let post;
    try {
        post = await models_1.FreePosts.postsWrite({
            title,
            body,
            anonymous,
            urlSlug: uniqueUrlSlug,
            password: anonymous === true ? password : null,
            displayname: anonymous === true ? displayname : stateUsername,
            ipAddress: parseIp,
            fk_user_id: anonymous === true ? null : ctx.state.user._id,
        });
    }
    catch (e) {
        ctx.throw(500, e);
    }
    let data;
    try {
        data = await models_1.FreePosts.findPostById(post.id);
    }
    catch (e) {
        ctx.throw(500, e);
    }
    Object.assign(data, { liked: false });
    ctx.body = data;
};
FreePostsCtrl.readPost = async (ctx) => {
    const schema = Joi.object().keys({
        urlSlug: Joi.string().required(),
    });
    const result = Joi.validate(ctx.params, schema);
    if (result.error) {
        console.log(result.error);
        ctx.status = 400; // BadRequest;
        ctx.body = {
            name: 'WRONG_SCHEMA',
        };
        return;
    }
    const { urlSlug } = ctx.params;
    let post = null;
    try {
        post = await models_1.FreePosts.readPost(urlSlug);
    }
    catch (e) {
        ctx.throw(500, e);
    }
    if (!post) {
        ctx.status = 404; // NOT found;
        return;
    }
    try {
        await models_1.FreePosts.updateViewsCount({
            postId: post.id,
            totalViews: post.totalViews,
        });
    }
    catch (e) {
        ctx.throw(500, e);
    }
    let likesCount = null;
    try {
        likesCount = await models_1.FreePostLike.postLikesCount(post.id);
    }
    catch (e) {
        ctx.throw(500, e);
    }
    let liked = false;
    const userId = ctx.state.user && ctx.state.user._id;
    if (userId) {
        try {
            liked = await models_1.FreePostLike.checkExists({
                userId,
                postId: post.id,
            });
        }
        catch (e) {
            ctx.throw(500, e);
        }
    }
    post = Object.assign(post, { likesCount, liked });
    ctx.body = post;
};
FreePostsCtrl.removePost = async (ctx) => {
    const schema = Joi.object().keys({
        urlSlug: Joi.string().required(),
    });
    const result = Joi.validate(ctx.params, schema);
    if (result.error) {
        console.log(result.error);
        ctx.status = 400; // BadRequest;
        ctx.body = {
            name: 'WRONG_SCHEMA',
        };
        return;
    }
    const { urlSlug } = ctx.params;
    let post = null;
    try {
        post = await models_1.FreePosts.findByUrlslug(urlSlug);
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
            await models_1.FreePosts.removePost(post.id);
            await models_1.FreeComments.commentRemove({ postId: post.id });
            ctx.status = 204;
        }
        catch (e) {
            ctx.throw(500, e);
        }
    }
    catch (e) {
        ctx.throw(500, e);
    }
};
FreePostsCtrl.likePost = async (ctx) => {
    const schema = Joi.object().keys({
        postId: Joi.string().uuid().required(),
    });
    const result = Joi.validate(ctx.params, schema);
    if (result.error) {
        ctx.status = 400; // BadRequest
        ctx.body = {
            name: 'WRONG_SCHEMA',
        };
        return;
    }
    const { postId } = ctx.params;
    const { _id: userId } = ctx.state.user;
    if (!userId) {
        ctx.status = 403; // forbidden
        ctx.body = {
            name: 'FORBIDDEN',
        };
        return;
    }
    try {
        await models_1.FreePostLike.createLike({
            userId,
            postId,
        });
    }
    catch (e) {
        ctx.throw(500, e);
    }
    let likesCount = null;
    try {
        likesCount = await models_1.FreePostLike.postLikesCount(postId);
    }
    catch (e) {
        ctx.throw(500, e);
    }
    ctx.body = likesCount;
};
FreePostsCtrl.unlikePost = async (ctx) => {
    const schema = Joi.object().keys({
        postId: Joi.string().uuid().required(),
    });
    const result = Joi.validate(ctx.params, schema);
    if (result.error) {
        ctx.status = 400; // BadRequest
        ctx.body = {
            name: 'WRONG_SCHEMA',
        };
        return;
    }
    const { postId } = ctx.params;
    const { _id: userId } = ctx.state.user;
    if (!userId) {
        ctx.status = 403;
        ctx.body = {
            name: 'FORBIDDEN',
        };
        return;
    }
    try {
        await models_1.FreePostLike.deletedLike({
            postId,
            userId,
        });
    }
    catch (e) {
        ctx.throw(500, e);
    }
    let likesCount = null;
    try {
        likesCount = await models_1.FreePostLike.postLikesCount(postId);
    }
    catch (e) {
        ctx.throw(500, e);
    }
    ctx.body = likesCount;
};
FreePostsCtrl.searchPost = async (ctx) => {
    const schema = Joi.object().keys({
        criteria: Joi.string().required(),
        word: Joi.string().min(2).max(10).required(),
    });
    const result = Joi.validate(ctx.params, schema);
    if (result.error) {
        ctx.status = 400; // BadRequest
        ctx.body = {
            name: 'WRONG_PARAMS',
        };
        return;
    }
    const { criteria, word } = ctx.params;
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
        posts = await models_1.FreePosts.searchPost({ criteria, word, page });
    }
    catch (e) {
        ctx.throw(500, e);
    }
    async function checkCoutingComemnt(post) {
        if (!post)
            return;
        const parsePost = post.toJSON();
        const postId = parsePost.id;
        let commentsCount = null;
        try {
            commentsCount = await models_1.FreeComments.checkCommentCount(postId);
        }
        catch (e) {
            ctx.throw(500, e);
        }
        let likesCount = null;
        try {
            likesCount = await models_1.FreePostLike.postLikesCount(postId);
        }
        catch (e) {
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
};
exports.default = FreePostsCtrl;
//# sourceMappingURL=freePostsCtrl.js.map