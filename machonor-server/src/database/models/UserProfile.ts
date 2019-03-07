import * as Sequelize from 'sequelize';
import { sequelize, IModels } from 'database';

import { primaryUUID } from 'lib/common';

interface IUserProfile {
  id?: string;
  displayname: string;
  thumbnail?: string;
  fk_user_id?: string;
  shortBio?: string;
  amount?: number;
  level?: number;
}

interface IParameter {
  fk_user_id: string;
  displayname: string;
}

type Instance = Sequelize.Instance<IUserProfile> & IUserProfile;

export default class UserProfile {
  static init = (sequelize: Sequelize.Sequelize, Seqeulize: Sequelize.DataTypes) => {
    const Model = sequelize.define<Instance, IUserProfile>('UserProfile', {
      id: primaryUUID,
      displayname: Sequelize.STRING,
      thumbnail: Seqeulize.STRING,
      shortBio: Sequelize.STRING,
      fk_user_id: Seqeulize.UUID,
      amount: { type: Seqeulize.INTEGER, defaultValue: 0 },
      level: { type: Seqeulize.INTEGER, defaultValue: 1 },
    }, {
      timestamps: true,
      paranoid: true,
      tableName: 'UserProfile',
    });
    return Model;
  }
  static Model = UserProfile.init(sequelize, Sequelize);
  static localRegister({ displayname, fk_user_id }: IParameter) {
    const { Model } = this;
    return Model.build({
      displayname,
      fk_user_id,
    }).save();
  }
}