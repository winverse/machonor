import { combineReducers } from 'redux';
import { penderReducer as pender } from 'redux-pender';

import core, { ICore } from './core';
import base, { IBase } from './base';
import auth, { IAuth } from './auth';
import post, { IPosts } from './posts';
import write, { IWrite } from './write';
import user, { IUser } from './user';

export default combineReducers({
  core,
  base,
  auth,
  post,
  write,
  user,
  pender,
});

export interface IModule {
  core: ICore;
  base: IBase;
  auth: IAuth;
  post: IPosts;
  write: IWrite;
  user: IUser;
  pender: {
    pending: boolean;
    success: boolean;
    failure: boolean;
  };
}
