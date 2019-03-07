/* tslint:disable */
import { Context } from 'koa';
import * as fs from 'fs';
import * as Joi from 'joi';
import * as sharp from 'sharp';
import * as sizeOf from 'image-size';

import {
  JusticePosts,
} from 'database/models';
import {
  escapeForUrl,
  generateSlugId,
} from 'lib/common';

export default class JusticePostsCtrl {
  static writePosts = async (ctx: Context) => {
    interface IBodySchema {
      title: string;
      postGoal: string;
      body: string;
      writerDisclosure: boolean;
    }

    const schema = Joi.object().keys({
      title: Joi.string().min(3).max(150).required(),
      postGoal: Joi.string().min(3).max(150).required(),
      body: Joi.string().min(9).required(),
      writerDisclosure: Joi.boolean().required(),
    });
    const result: Joi.ValidationResult<string> = Joi.validate(ctx.request.body, schema);
    if (result.error) {
      ctx.status = 400; // BadRequest
      ctx.body = {
        name: 'WRONG_SCHEMA',
        messgae: result.error,
      };
      return;
    }
    const { title, body, postGoal, writerDisclosure }: IBodySchema = ctx.request.body;
    const uniqueUrlSlug = escapeForUrl(`${title} ${generateSlugId()}`);
    let post: any = null;
    try {
      const post = await JusticePosts.postsWrite({
        title,
        body,
        postGoal,
        writerDisclosure,
        urlSlug: uniqueUrlSlug,
        fk_user_id: ctx.state.user._id,
      });
    } catch (e) {
      ctx.throw(500, e);
    }
    ctx.body = post;
  }

  static imageUpload = async (ctx: Context) => {
    const { CKEditorFuncNum } = ctx.request.query;
    const file = (ctx as any).req.file;
    const fileName = file.filename;

    if (!file) {
      ctx.status = 400;
      return;
    }
    let html: any;
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
        await sharp(newPath).resize(700, nextHeight).toBuffer(function(err, buffer) {
          if (err) return;
          fs.writeFile(newPath, buffer, function(e) {
            if (e) return;
          })
        })
      } catch (e) {
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
  }
}