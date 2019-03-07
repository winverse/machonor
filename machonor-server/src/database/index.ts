import * as Sequelize from 'sequelize';

const { MYSQL_PW } = process.env;

import operatorsAliases from './operatorsAliases';

export const sequelize: Sequelize.Sequelize = new Sequelize('webuy', 'root', MYSQL_PW, {
  operatorsAliases,
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  port: 3306,
  timezone: 'Asia/Seoul',
  define: {
    freezeTableName: false,
  },
});

import {
  User,
  UserProfile,
  JusticePosts,
  FreePosts,
  FreeComments,
  FreeCommentLike,
  FreePostLike,
} from 'database/models';

export interface IModels {
  User?: any;
  UserProfile?: any;
  JusticePosts?: any;
  FreePosts?: any;
  FreeComments?: any;
  FreeCommentLike?: any;
  FreePostLike?: any;
}

function associate() {
  const models: IModels = {
    User: User.Model,
    UserProfile: UserProfile.Model,
    JusticePosts: JusticePosts.Model,
    FreePosts: FreePosts.Model,
    FreePostLike: FreePostLike.Model,
    FreeComments: FreeComments.Model,
    FreeCommentLike: FreeCommentLike.Model,
  };

  Object.values(models).map((model: any) => {
    if (model.associate) {
      model.associate(models);
    }
  });
}

export function sync() {
  associate();
  sequelize.sync();
}