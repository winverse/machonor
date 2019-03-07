import * as Sequelize from 'sequelize';
import { sequelize, IModels } from 'database';
import * as crypto from 'crypto';

import { primaryUUID } from 'lib/common';
import { UserProfile } from 'database/models';
import { generateToken } from 'lib/token';

const {
  SECRET_KEY,
} = process.env;

interface IUser {
  id?: string;
  userid: string;
  email: string;
  password: string;
}

interface IParameter {
  id?: string;
  userid?: string;
  email?: string;
  password?: string;
  instance?: any;
}

type Instance = Sequelize.Instance<IUser> & IUser;

function hash(password: string) {
  return crypto.createHmac('sha512', SECRET_KEY).update(password).digest('hex');
}

export default class User {
  static init = (sequelize: Sequelize.Sequelize, Sequelize: Sequelize.DataTypes) => {
    const Model = sequelize.define<Instance, IUser>('User', {
      id: primaryUUID,
      userid: Sequelize.STRING,
      email: { type: Sequelize.STRING, unique: true },
      password: Sequelize.STRING,
    }, {
      timestamps: true,
      paranoid: true,
      tableName: 'User',
    });
    Model.associate = (models: IModels) => {
      Model.hasOne(models.UserProfile, {
        foreignKey: 'fk_user_id',
        onDelete: 'CASCADE',
        onUpdate: 'restrict',
      });
    };
    return Model;
  }
  static Model = User.init(sequelize, Sequelize);
  static findByEmail (email: string) {
    const { Model } = this;
    return Model.findOne({
      include: [{
        model: UserProfile.Model,
        attributes: ['displayname', 'thumbnail', 'shortBio', 'amount', 'level'],
        required: false,
      }],
      where: {
        email,
      },
    }).then((data) => {
      if (!data) return null;
      return data.get({ plain: true });
    });
  }
  static findByDisplayname (displayname: string) {
    const { Model } = this;
    return Model.findOne({
      include: [{
        model: UserProfile.Model,
        where: {
          displayname,
        },
        attributes: ['displayname', 'thumbnail', 'shortBio', 'amount', 'level'],
        required: true,
      }],
    }).then((data) => {
      if (!data) return;
      return data.get({ plain: true });
    });
  }
  static findByUserId (userid: string) {
    const { Model } = this;
    return Model.findOne({
      include: [{
        model: UserProfile.Model,
        attributes: ['fk_user_id', 'displayname', 'thumbnail', 'shortBio', 'amount', 'level'],
        required: true,
      }],
      where: {
        userid,
      },
    }).then((data) => {
      if (!data) return;
      return data.get({ plain: true });
    });
  }
  static localRegister ({ email, userid, password }: IParameter) {
    const { Model } = this;
    return Model.build({
      email,
      userid,
      password: hash(password),
    }).save();
  }
  static generatorToken({ instance, id }: IParameter) {
    const payload: any = {
      _id: id,
      amount: instance.amount || null,
      level: instance.level || null,
      profile: {
        displayname: instance.displayname,
        thumbnail: instance.thumbnail || null,
        shortBio: instance.shortBio || null,
      },
    };
    return generateToken({
      payload,
      subject: 'account',
    });
  }
  static validatePassword({ instance, password }: IParameter) {
    const hashed = hash(password);
    return instance.password === hashed;
  }
}