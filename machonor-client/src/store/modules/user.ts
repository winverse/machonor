import { handleActions, createAction } from 'redux-actions';
import { applyPenders } from 'redux-pender';
import produce from 'immer';

import * as UserAPI from 'lib/api/user';

const SET_INFO = 'user/SET_INFO';
const SET_LOGGED_INFO = 'user/SET_LOGGED_INFO';
const SET_VALIDATED = 'user/SET_VALIDATED';
const LOGOUT = 'user/LOGOUT';
const CHECK_STATUS = 'user/CHECK_STATUS';
const GET_USER_INFO = 'user/GET_USER_INFO';

export interface ILoggedInfo {
  displayname: string;
  thumbnail: string;
  shortBio: string;
}
interface Info {
  name: string;
  value: any;
}

export const userActions = {
  setInfo: createAction<Info, Info>(SET_INFO, ({ name, value }) => ({ name, value })),
  setLoggedInfo: createAction<ILoggedInfo, ILoggedInfo>(SET_LOGGED_INFO, ({ displayname, thumbnail, shortBio }) => ({ displayname, thumbnail, shortBio })),
  setValidated: createAction<boolean>(SET_VALIDATED),
  logout: createAction<any>(LOGOUT, UserAPI.logout),
  checkStatus: createAction<any>(CHECK_STATUS, UserAPI.checkStatus),
  getUserInfo: createAction<any, any>(GET_USER_INFO, UserAPI.getUser),
};

type SetInfoAction = ReturnType<typeof userActions.setInfo>;
type SetLoggedInfoAction = ReturnType<typeof userActions.setLoggedInfo>;
type SetValidatedAction = ReturnType<typeof userActions.setValidated>;
type LogoutAction = ReturnType<typeof userActions.logout>;
type CheckStatusAction = ReturnType<typeof userActions.checkStatus>;
type GetUserInfoAction = ReturnType<typeof userActions.getUserInfo>;

export interface IUser {
  userId: string; 
  amount: number;
  level: number;
  loggedInfo: ILoggedInfo;
  logged: boolean;
  validated: boolean;
}

const initialState: IUser = {
  loggedInfo: {
    displayname: '',
    thumbnail: '',
    shortBio: '',
  },
  userId: '',
  amount: 0,
  level: 1,
  logged: false,
  validated: false,
};

const reducer = handleActions<IUser, any>({
  [SET_INFO]: (state: IUser, action: SetInfoAction) => {
    return produce(state, (draft) => {
      const { name, value } = action.payload!;
      draft[name] = value;
    });
  },
  [SET_LOGGED_INFO]: (state, action: SetLoggedInfoAction) => {
    return produce(state, (draft) => {
      draft.loggedInfo = action.payload!;
      draft.logged = true;
    });
  },
  [SET_VALIDATED]: (state, action: SetValidatedAction) => {
    return produce(state, (draft) => {
      draft.validated = action.payload!;
    });
  },
}, initialState);

export default applyPenders(reducer, [
  {
    type: CHECK_STATUS,
    onSuccess: (state: IUser, action: CheckStatusAction) => {
      return produce(state, (draft) => {
        const { data } = action.payload!;
        draft.loggedInfo = data;
        draft.validated = true;
      });
    },
    onFailure: (state: IUser, action: CheckStatusAction) => {
      return initialState;
    },
  },
  {
    type: LOGOUT,
    onSuccess: (state: IUser, action: LogoutAction) => {
      return produce(state, (draft) => {
        draft.logged = false;
      });
    },
  },
  {
    type: GET_USER_INFO,
    onSuccess: (state: IUser, action: GetUserInfoAction) => {
      return produce(state, (draft) => {
        const { data } = action.payload!;
        if (!data) return;
        const { userId, amount, level } = data;
        draft.amount = amount;
        draft.userId = userId;
        draft.level = level;
      });
    },
  },
]);