"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Joi = require("joi");
const sharp = require("sharp");
const sizeOf = require("image-size");
const models_1 = require("database/models");
const common_1 = require("lib/common");
class JusticePostsCtrl {
}
JusticePostsCtrl.writePosts = async (ctx) => {
    const schema = Joi.object().keys({
        title: Joi.string().min(3).max(150).required(),
        postGoal: Joi.string().min(3).max(150).required(),
        body: Joi.string().min(9).required(),
        writerDisclosure: Joi.boolean().required(),
    });
    const result = Joi.validate(ctx.request.body, schema);
    if (result.error) {
        ctx.status = 400; // BadRequest
        ctx.body = {
            name: 'WRONG_SCHEMA',
            messgae: result.error,
        };
        return;
    }
    const { title, body, postGoal, writerDisclosure } = ctx.request.body;
    const uniqueUrlSlug = common_1.escapeForUrl(`${title} ${common_1.generateSlugId()}`);
    let post = null;
    try {
        const post = await models_1.JusticePosts.postsWrite({
            title,
            body,
            postGoal,
            writerDisclosure,
            urlSlug: uniqueUrlSlug,
            fk_user_id: ctx.state.user._id,
        });
    }
    catch (e) {
        ctx.throw(500, e);
    }
    ctx.body = post;
};
JusticePostsCtrl.imageUpload = async (ctx) => {
    const { CKEditorFuncNum } = ctx.request.query;
    const file = ctx.req.file;
    const fileName = file.filename;
    if (!file) {
        ctx.status = 400;
        return;
    }
    let html;
    const stats = fs.statSync(file.path);
    if (stats.size > 1024 * 1024 * 5) { // 5mb
        ctx.status = 413;
        html = "";
        html += "<script type='text/javascript'>";
        html += "    var funcNum = " + 1 + ";";
        html += "    var url =" + null + ";";
        html += "    var message = \"이미지  사이즈가 너무 큽니다(최대 5mb)\";";
        html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
        html += "</script>";
        ctx.body = html;
        return;
    }
    let newPath = "public/uploads/" + fileName;
    const image = sizeOf(newPath);
    if (image.width > 750) {
        const nextHeight = Math.round((700 / image.width) * image.height);
        try {
            await sharp(newPath).resize(700, nextHeight).toBuffer(function (err, buffer) {
                if (err)
                    return;
                fs.writeFile(newPath, buffer, function (e) {
                    if (e)
                        return;
                });
            });
        }
        catch (e) {
            ctx.throw(500, e);
        }
    }
    html = "";
    html += "<script type='text/javascript'>";
    html += "    var funcNum = " + CKEditorFuncNum + ";";
    html += "    var url = \"/public/uploads/" + fileName + "\";";
    html += "    var message = \"이미지 업로드 성공\";";
    html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
    html += "</script>";
    ctx.body = html;
};
exports.default = JusticePostsCtrl;
//# sourceMappingURL=justicePostsCtrl.js.map