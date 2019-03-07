import * as Sequelize from 'sequelize';
import { sequelize, IModels } from 'database';

import { primaryUUID } from 'lib/common';
import {
  User,
  UserProfile,
} from 'database/models';

interface IFreeComments {
  id?: string;
  text: string;
  fk_user_id: string;
  fk_post_id: string;
  level: number;
  likesCount?: number;
  hasReply?: boolean;
  replyTo: string;
  displayname: string;
  password?: string;
  anonymous: boolean;
  deletedAt?: any;
  ipAddress: string;
}

interface IListComment {
  postId: string;
  order: 'popular' | 'recently' | 'past';
}

type Instance = Sequelize.Instance<IFreeComments> & IFreeComments;

export default class FreeComments {
  static init = (sequelize: Sequelize.Sequelize, Sequelize: Sequelize.DataTypes) => {
    const Model = sequelize.define<Instance, IFreeComments>('FreeComments', {
      id: primaryUUID,
      text: Sequelize.TEXT,
      fk_user_id: Sequelize.UUID,
      fk_post_id: Sequelize.UUID,
      level: { type: Sequelize.INTEGER, defaultValue: 0 },
      likesCount: { type: Sequelize.INTEGER, defaultValue: 0 },
      hasReply: { type: Sequelize.BOOLEAN, defaultValue: false },
      replyTo: Sequelize.UUID,
      displayname: Sequelize.STRING,
      password: Sequelize.STRING,
      anonymous: Sequelize.BOOLEAN,
      ipAddress: Sequelize.STRING,
    }, {
      timestamps: true,
      paranoid: true,
      tableName: 'FreeComments',
      indexes: [
        { fields: ['createdAt'] },
      ],
    });
    Model.associate = (models: IModels) => {
      Model.belongsTo(models.FreePosts, {
        foreignKey: 'fk_post_id',
        onDelete: 'CASCADE',
        onUpdate: 'restrict',
      });
      Model.belongsTo(models.User, {
        foreignKey: 'fk_user_id',
        onDelete: 'CASCADE',
        onUpdate: 'restrict',
      });
    };
    return Model;
  }
  static Model = FreeComments.init(sequelize, Sequelize);
  static writeComment ({
    text,
    postId,
    userId,
    replyTo,
    level,
    displayname,
    anonymous,
    password,
    ipAddress,
  }) {
    const { Model } = this;
    return Model.build({
      text,
      replyTo,
      level,
      displayname,
      anonymous,
      password,
      ipAddress,
      fk_post_id: postId,
      fk_user_id: userId,
    }).save();
  }
  static async findById (commentId) {
    const { Model } = this;
    return Model.findOne({
      include: [{
        model: User.Model,
        include: [{ model: UserProfile.Model, attributes: ['amount'] }],
        attributes: ['id'],
      }],
      where: {
        id: commentId,
      },
      attributes: [
        'fk_post_id',
        'id',
        'text',
        'displayname',
        'level',
        'likesCount',
        'password',
        'anonymous',
        'replyTo',
        'hasReply',
        'createdAt',
        'deletedAt',
        'ipAddress',
      ],
    });
  }
  static async listComments ({ postId, order }: IListComment) {
    const { Model } = this;
    const bySort = order === 'popular' ? [['likesCount', 'DESC'], ['createdAt', 'DESC']] : (
      order === 'recently' ? [['createdAt', 'DESC']] : [['createdAt', 'ASC']]
    );
    try {
      const result = await Model.findAndCountAll({
        include: [{
          model: User.Model,
          include: [{ model: UserProfile.Model, attributes: ['amount'] }],
          attributes: ['id'],
        }],
        where: {
          fk_post_id: postId,
          level: 0, // 댓글인것만 가져온다, 지우지말것
        },
        attributes: [
          'fk_post_id',
          'id',
          'text',
          'displayname',
          'level',
          'likesCount',
          'password',
          'anonymous',
          'replyTo',
          'hasReply',
          'createdAt',
          'deletedAt',
          'ipAddress',
        ],
        paranoid: false,
        order: bySort,
      });
      const { count, rows: data } = result;
      const comments = data.map(c => c.toJSON());
      for (let c  of comments) {
        if (c.hasReply) {
          const reply = await Model.findAll({
            include: [{
              model: User.Model,
              include: [{ model: UserProfile.Model, attributes: ['amount'] }],
              attributes: ['id'],
            }],
            where: {
              replyTo: c.id,
              level: 1,
            },
            attributes: [
              'id',
              'text',
              'displayname',
              'level',
              'password',
              'anonymous',
              'createdAt',
              'replyTo',
              'deletedAt',
              'ipAddress',
            ],
            paranoid: false,
            order: [['createdAt', 'DESC']],
          }).then((data) => {
            return data;
          });
          const parse = { reply };
          Object.assign(c, parse);
        } else {
          const parse = { reply: [] };
          Object.assign(c, parse);
        }
      }
      return {
        count,
        rows: comments,
      };
    } catch (e) {
      throw(e);
    }
  }
  static hasReplyUpdate (commentId: string) {
    const { Model } = this;
    return Model.update(
      { hasReply: true },
      { where: { id: commentId } },
    );
  }
  static findCommentReply (commentId: string) {
    const { Model } = this;
    return Model.find({
      where : {
        replyTo: commentId,
        level: 1,
      },
    });
  }
  static commentCountUpdate ({ commentId, add }: ICommentCountUpdatePayload) {
    const { Model } = this;
    Model.findOne({
      where: {
        id: commentId,
        deletedAt: null,
      },
    }).then((data) => {
      return data.update({ likesCount: data.likesCount + (add) });
    });
  }
  static commentTextUpdate ({ commentId, text, displayname, password }: ICommentTextUpdatePaylaod) {
    const { Model } = this;
    return Model.findOne({
      where: {
        id: commentId,
        deletedAt: null,
      },
    }).then((data) => {
      return data.update({ text, displayname, password });
    });
  }
  static commentRemove ({ commentId, postId }: ICommentRemovePayload) {
    const { Model } = this;
    return Model.findOne({
      where: {
        ...(postId ? { fk_post_id: postId } : { id: commentId }),
      },
    }).then((data) => {
      if (!data) return;
      return data.destroy();
    });
  }
  static checkCommentCount (postId) {
    const { Model } = this;
    return Model.count({
      where: {
        fk_post_id: postId,
      },
    });
  }
}

interface ICommentCountUpdatePayload {
  commentId: string;
  add: number;
}

interface ICommentTextUpdatePaylaod {
  commentId: string;
  text: string;
  displayname: string;
  password: string;
}

interface ICommentRemovePayload {
  commentId?: string;
  postId?: string;
}