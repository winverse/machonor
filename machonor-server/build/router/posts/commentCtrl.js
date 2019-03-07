"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const getIp_1 = require("lib/getIp");
const Redis = require("redis");
const util_1 = require("util");
const models_1 = require("database/models");
class CommentCtrl {
}
CommentCtrl.writeComment = async (ctx) => {
    const client = Redis.createClient();
    const schema = Joi.object().keys({
        text: Joi.string().min(1).max(500).required(),
        postId: Joi.string().uuid().optional(),
        displayname: Joi.string().min(2).max(10).allow('').optional(),
        password: Joi.string().min(0).max(30).allow('').optional(),
        replyTo: Joi.string().uuid().optional(),
        commentId: Joi.string().uuid().optional(),
    });
    const result = Joi.validate(ctx.request.body, schema);
    if (result.error) {
        ctx.status = 400; // BadRequest;
        ctx.body = {
            name: 'WRONG_SCHEMA',
        };
        return;
    }
    const { text, postId, displayname, password, replyTo, commentId } = ctx.request.body;
    const user = ctx.state.user && ctx.state.user;
    let ip;
    try {
        ip = await getIp_1.getIpAddress();
    }
    catch (e) {
        ctx.throw(500, e);
    }
    const getAsync = util_1.promisify(client.get).bind(client);
    let getRedis = null;
    try {
        getRedis = await getAsync(ip);
    }
    catch (e) {
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
        let comment = null;
        try {
            comment = await models_1.FreeComments.commentTextUpdate({
                password,
                commentId,
                text,
                displayname: displayname ? displayname : user.profile.displayname,
            });
        }
        catch (e) {
            ctx.throw(500, e);
        }
        ctx.body = {
            commentId,
            comment,
        };
        return;
    }
    if (replyTo) { // 부모 댓글의 hasReply 컬럼 상태를 업데이트 해준다.
        let comment = null;
        try {
            comment = await models_1.FreeComments.hasReplyUpdate(replyTo);
        }
        catch (e) {
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
    let comment = null;
    try {
        comment = await models_1.FreeComments.writeComment({
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
    }
    catch (e) {
        ctx.throw(500, e);
    }
    try {
        comment = await models_1.FreeComments.findById(comment.id);
    }
    catch (e) {
        ctx.throw(500, e);
    }
    if (!comment)
        return;
    ctx.body = comment;
};
CommentCtrl.removeComment = async (ctx) => {
    const schema = Joi.object().keys({
        commentId: Joi.string().uuid().required(),
    });
    const result = Joi.validate(ctx.params, schema);
    if (result.error) {
        ctx.status = 400; // BadRequest
        ctx.body = {
            name: 'WRONG_SCHEMA',
            messgae: result.error,
        };
        return;
    }
    const { commentId } = ctx.params;
    let comment = null;
    try {
        comment = await models_1.FreeComments.commentRemove({ commentId });
    }
    catch (e) {
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
};
CommentCtrl.getCommentList = async (ctx) => {
    const schema = Joi.object().keys({
        postId: Joi.string().uuid().required(),
        order: Joi.string().max(10).allow('popular').allow('recently').allow('past').required(),
    });
    const result = Joi.validate(ctx.params, schema);
    if (result.error) {
        ctx.status = 400; // BadRequest
        ctx.body = {
            name: 'WRONG_SCHEMA',
            messgae: result.error,
        };
        return;
    }
    const { order, postId } = ctx.params;
    let list = null;
    try {
        list = await models_1.FreeComments.listComments({
            postId,
            order: order || 'popular',
        });
    }
    catch (e) {
        ctx.throw(500, e);
    }
    let { rows, count } = list; // rows: 글의 댓글 목록
    async function checkLiked(post) {
        const userId = ctx.state.user && ctx.state.user._id; // 현재 로그인한 계정 id
        const commentId = post.id; // 댓글의 id,
        let like = null;
        if (userId) {
            try {
                // 현재 로그인한 계정이 댓글에 좋아요를 했는지 체크한다.
                like = await models_1.FreeCommentLike.checkExists({ userId, commentId });
            }
            catch (e) {
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
};
CommentCtrl.like = async (ctx) => {
    const schema = Joi.object().keys({
        commentId: Joi.string().uuid().required(),
    });
    const result = Joi.validate(ctx.params, schema);
    if (result.error) {
        ctx.status = 400; // BadRequest
        ctx.body = {
            name: 'WRONG_SCHEMA',
            messgae: result.error,
        };
        return;
    }
    const { commentId } = ctx.params;
    const { _id: userId } = ctx.state.user;
    if (!userId) {
        ctx.status = 403;
        ctx.body = {
            name: 'FORBIDDEN',
        };
        return;
    }
    try {
        await models_1.FreeCommentLike.createLike({
            userId,
            commentId,
        });
    }
    catch (e) {
        ctx.throw(500, e);
    }
    try {
        await models_1.FreeComments.commentCountUpdate({ commentId, add: 1 });
    }
    catch (e) {
        ctx.throw(500, e);
    }
    let likesCount = null;
    try {
        likesCount = await models_1.FreeCommentLike.findByIdCount(commentId);
    }
    catch (e) {
        ctx.throw(500, e);
    }
    ctx.body = {
        likesCount,
    };
};
CommentCtrl.unLike = async (ctx) => {
    const schema = Joi.object().keys({
        commentId: Joi.string().uuid().required(),
    });
    const result = Joi.validate(ctx.params, schema);
    if (result.error) {
        ctx.status = 400; // BadRequest
        ctx.body = {
            name: 'WRONG_SCHEMA',
        };
        return;
    }
    const { commentId } = ctx.params;
    const { _id: userId } = ctx.state.user;
    if (!userId) {
        ctx.status = 403;
        ctx.body = {
            name: 'FORBIDDEN',
        };
        return;
    }
    try {
        await models_1.FreeCommentLike.deletedLike({
            userId,
            commentId,
        });
    }
    catch (e) {
        ctx.throw(500, e);
    }
    try {
        await models_1.FreeComments.commentCountUpdate({ commentId, add: -1 });
    }
    catch (e) {
        ctx.throw(500, e);
    }
    let likesCount = null;
    try {
        likesCount = await models_1.FreeCommentLike.findByIdCount(commentId);
    }
    catch (e) {
        ctx.throw(500, e);
    }
    ctx.body = {
        likesCount,
    };
};
exports.default = CommentCtrl;
//# sourceMappingURL=commentCtrl.js.map