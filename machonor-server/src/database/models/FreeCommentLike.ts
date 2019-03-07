import * as Sequelize from 'sequelize';
import { sequelize, IModels } from 'database';

import { primaryUUID } from 'lib/common';

interface IFreeCommentLike {
  id?: string;
  fk_user_id: string;
  fk_comment_id: string;
}

type Instance = Sequelize.Instance<IFreeCommentLike> & IFreeCommentLike;

export default class FreeCommentsLike {
  static init = (sequelize: Sequelize.Sequelize, Sequelize: Sequelize.DataTypes) => {
    const Model = sequelize.define<Instance, IFreeCommentLike>('FreeCommentLike', {
      id: primaryUUID,
      fk_comment_id: Sequelize.UUID,
      fk_user_id: Sequelize.UUID,
    }, {
      timestamps: false,
      tableName: 'FreeCommentLike',
    });
    Model.associate = (models: IModels) => {
      Model.belongsTo(models.User, {
        foreignKey: 'fk_user_id',
        onDelete: 'CASCADE',
        onUpdate: 'restrict',
      });
      Model.belongsTo(models.FreeComments, {
        foreignKey: 'fk_comment_id',
        onDelete: 'CASCADE',
        onUpdate: 'restrict',
      });
    };
    return Model;
  }
  static Model = FreeCommentsLike.init(sequelize, Sequelize);
  static checkExists ({ userId, commentId }) {
    const { Model } = this;
    return Model.findOne({
      where: {
        fk_comment_id: commentId,
        fk_user_id: userId,
      },
      raw: true,
      attributes: ['id'],
    }).then((data) => {
      return data;
    });
  }
  static createLike ({ userId, commentId }) {
    const { Model } = this;
    return Model.build({
      fk_user_id: userId,
      fk_comment_id: commentId,
    }).save();
  }
  static deletedLike ({ userId, commentId }) {
    const { Model } = this;
    return Model.destroy({
      where: {
        fk_user_id: userId,
        fk_comment_id: commentId,
      },
    });
  }
  static findByIdCount (commentId) {
    const { Model } = this;
    return Model.count({
      where: {
        fk_comment_id: commentId,
      },
    });
  }
}