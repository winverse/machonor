import * as Sequelize from 'sequelize';
import { sequelize, IModels } from 'database';

import { primaryUUID } from 'lib/common';

interface IFreePostLike {
  id?: string;
  fk_user_id: string;
  fk_post_id: string;
}

type Instance = Sequelize.Instance<IFreePostLike> & IFreePostLike;

export default class FreePostLike {
  static init = (sequelize: Sequelize.Sequelize, Sequelize: Sequelize.DataTypes) => {
    const Model = sequelize.define<Instance, IFreePostLike>('FreePostLike', {
      id: primaryUUID,
      fk_post_id: Sequelize.UUID,
      fk_user_id: Sequelize.UUID,
    }, {
      timestamps: false,
      tableName: 'FreePostLike',
    });
    Model.associate = (models: IModels) => {
      Model.belongsTo(models.User, {
        foreignKey: 'fk_user_id',
        onDelete: 'CASCADE',
        onUpdate: 'restrict',
      });
      Model.belongsTo(models.FreePosts, {
        foreignKey: 'fk_post_id',
        onDelete: 'CASCADE',
        onUpdate: 'restrict',
      });
    };
    return Model;
  }
  static Model = FreePostLike.init(sequelize, Sequelize);
  static checkExists ({ userId, postId }) {
    const { Model } = this;
    return Model.findOne({
      where: {
        fk_post_id: postId,
        fk_user_id: userId,
      },
      raw: true,
      attributes: ['id'],
    }).then((data) => {
      return data ? true : false;
    });
  }
  static createLike ({ userId, postId }) {
    const { Model } = this;
    return Model.build({
      fk_user_id: userId,
      fk_post_id: postId,
    }).save();
  }
  static deletedLike ({ userId, postId }) {
    const { Model } = this;
    return Model.destroy({
      where: {
        fk_user_id: userId,
        fk_post_id: postId,
      },
    });
  }
  static postLikesCount (postId: string) {
    const { Model } = this;
    return Model.count({
      where: {
        fk_post_id: postId,
      },
    });
  }
}