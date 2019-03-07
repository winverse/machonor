import * as Sequelize from 'sequelize';
import { sequelize, IModels } from 'database';

import { primaryUUID } from 'lib/common';

interface IJusticePosts {
  id?: string;
  title: string;
  postGoal: string;
  writerDisclosure: false;
  body: string;
  urlSlug: string;
  fk_user_id: string;
}

type Instance = Sequelize.Instance<IJusticePosts> & IJusticePosts;

export default class JusticePosts {
  static init = (sequelize: Sequelize.Sequelize, Sequelize: Sequelize.DataTypes) => {
    const Model = sequelize.define<Instance, IJusticePosts>('JusticePosts', {
      id: primaryUUID,
      title: Sequelize.STRING,
      postGoal: Sequelize.STRING,
      writerDisclosure: Sequelize.BOOLEAN,
      body: Sequelize.TEXT,
      urlSlug: Sequelize.STRING,
      fk_user_id: Sequelize.UUID,
    }, {
      timestamps: true,
      paranoid: true,
      tableName: 'JusticePosts',
    });
    Model.associate = (models: IModels) => {
      Model.belongsTo(models.User, {
        foreignKey: 'fk_user_id',
        onDelete: 'restrict',
        onUpdate: 'restrict',
      });
    };
    return Model;
  }
  static Model = JusticePosts.init(sequelize, Sequelize);
  static postsWrite ({
    title,
    postGoal,
    writerDisclosure,
    body,
    fk_user_id,
    urlSlug,
  }) {
    const { Model } = this;
    return Model.build({
      title,
      postGoal,
      writerDisclosure,
      body,
      fk_user_id,
      urlSlug,
    }).save();
  }
}