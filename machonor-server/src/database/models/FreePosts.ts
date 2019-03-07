import * as Sequelize from 'sequelize';
import { sequelize, IModels } from 'database';

import { primaryUUID } from 'lib/common';
import User from './User';
import UserProfile from './UserProfile';

interface IFreePosts {
  id?: string;
  title: string;
  displayname: string;
  password?: string;
  body: string;
  urlSlug: string;
  fk_user_id?: string;
  anonymous: boolean;
  ipAddress?: string;
  hates?: number;
  totalViews?: number;
}

type Instance = Sequelize.Instance<IFreePosts> & IFreePosts;

export default class FreePosts {
  static init = (sequelize: Sequelize.Sequelize, Sequelize: Sequelize.DataTypes) => {
    const Model = sequelize.define<Instance, IFreePosts>('FreePosts', {
      id: primaryUUID,
      title: Sequelize.STRING,
      displayname: Sequelize.STRING,
      password: Sequelize.STRING,
      body: Sequelize.TEXT,
      urlSlug: Sequelize.STRING,
      fk_user_id: Sequelize.UUID,
      anonymous: Sequelize.BOOLEAN,
      ipAddress: Sequelize.STRING,
      totalViews: { type: Sequelize.INTEGER, defaultValue: 0 },
    }, {
      timestamps: true,
      paranoid: true,
      tableName: 'FreePosts',
      indexes: [
        { fields: ['urlSlug'] },
        { fields: ['createdAt'] },
      ],
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
  static Model = FreePosts.init(sequelize, Sequelize);
  static async getPostsList (page: number) {
    const { Model } = this;
    const limit = 20;
    const offset = (limit * (page - 1));
    const data = await Model.findAndCountAll({
      offset,
      limit,
      attributes: ['id', 'title', 'displayname', 'createdAt', 'totalViews', 'urlSlug', 'anonymous'],
      raw: false,
      order: [['createdAt', 'DESC']],
      where: {
        displayname: {
          $not: '운영자',
        },
      },
    });
    const lastPage = Math.ceil(data.count / limit);
    delete data.count;
    Object.assign(data, { lastPage });
    return data;
  }
  static async getNoticeList (page: number) {
    const { Model } = this;
    const limit = 20;
    const offset = (limit * (page - 1));
    const data = await Model.findAndCountAll({
      offset,
      limit,
      attributes: ['id', 'title', 'displayname', 'createdAt', 'totalViews', 'urlSlug'],
      order: [['createdAt', 'DESC']],
      where: {
        displayname: '운영자',
      },
    });
    const lastPage = Math.ceil(data.count / limit);
    delete data.count;
    Object.assign(data, { lastPage });
    return data;
  }
  static postsWrite ({
    title,
    displayname,
    password,
    body,
    urlSlug,
    fk_user_id,
    anonymous,
    ipAddress,
  }) {
    const { Model } = this;
    return Model.build({
      title,
      displayname,
      password,
      body,
      urlSlug,
      fk_user_id,
      anonymous,
      ipAddress,
    }).save();
  }
  static readPost (urlSlug: string) {
    const { Model } = this;
    return Model.findOne({
      include: [{
        model: User.Model,
        include: [{ model: UserProfile.Model, attributes: ['displayname', 'thumbnail' , 'shortBio'] }],
        attributes: ['id'],
      }],
      where: {
        urlSlug,
      },
      attributes: [
        'id',
        'title',
        'displayname',
        'password',
        'body',
        'urlSlug',
        'anonymous',
        'ipAddress',
        'totalViews',
        'createdAt',
      ],
    }).then((data) => {
      if (!data) return;
      return data.get({ plain: true });
    });
  }
  static findPostById (postId: string) {
    const { Model } = this;
    return Model.findOne({
      include: [{
        model: User.Model,
        include: [{ model: UserProfile.Model, attributes: ['displayname', 'thumbnail' , 'shortBio'] }],
        attributes: ['id'],
      }],
      where: {
        id: postId,
      },
      attributes: [
        'id',
        'title',
        'displayname',
        'password',
        'body',
        'urlSlug',
        'anonymous',
        'ipAddress',
        'totalViews',
        'createdAt',
      ],
    }).then((data) => {
      if (!data) return;
      return data.get({ plain: true });
    });
  }
  static postUpdate ({ postId, title, body, urlSlug, displayname, password }: IPostUpdatePayload) {
    const { Model } = this;
    return Model.update(
      { title, body, urlSlug, displayname, password },
      { where: { id: postId } },
    );
  }
  static findByUrlslug (urlSlug: string) {
    const { Model } = this;
    return Model.findOne({
      include: [{
        model: User.Model,
        attributes: ['id'],
      }],
      where: {
        urlSlug,
      },
      attributes: ['id', 'anonymous'],
    }).then((data) => {
      if (!data) return;
      return data.get({ plain: true });
    });
  }
  static removePost (postId) {
    const { Model } = this;
    return Model.findOne({
      where: {
        id: postId,
      },
    }).then((data) => {
      return data.destroy();
    });
  }
  static updateViewsCount ({ postId, totalViews }) {
    const { Model } = this;
    return Model.update(
      { totalViews: totalViews + 1 },
      { where: { id: postId } },
    );
  }
  static async searchPost ({ criteria, word, page }) {
    const { Model } = this;
    const limit = 5;
    const offset = (limit * (page - 1));
    const data = await Model.findAndCountAll({
      limit,
      offset,
      where: {
        ...(criteria === 'title' ? { title: { $like: `%${word}%` } } : (
          criteria === 'displayname' ? { displayname: { $like: `%${word}%` } } : (
          {[Sequelize.Op.or]: [
            {
              title: {
                $like: `%${word}%`,
              },
            },
            {
              body: {
                $like: `%${word}%`,
              },
            },
          ]}
          )
        )),
      },
      attributes: ['id', 'title', 'displayname', 'createdAt', 'totalViews', 'urlSlug'],
      order: [['createdAt', 'DESC']],
    });
    const lastPage = Math.ceil(data.count / limit);
    delete data.count;
    Object.assign(data, { lastPage });
    return data;
  }
}

interface IPostUpdatePayload {
  displayname: string;
  password: string;
  postId: string;
  title: string;
  body: string;
  urlSlug: string;
}