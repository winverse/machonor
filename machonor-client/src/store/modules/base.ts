import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';

const SET_NAVI_VISIBLE = 'base/SET_NAVI_VISIBLE';
const SET_TERM_VISIBLE = 'base/SET_TERM_VISIBLE';
const SET_REGISTER_VISIBLE = 'base/SET_REGISTER_VISIBLE';
const SET_LOGIN_VISIBLE = 'base/SET_LOGIN_VISIBLE';
const SET_USER_MENU_VISIBLE = 'base/SET_USER_MENU_VISIBLE';
const SET_SEARCH_OPTION_VISIBLE = 'base/SET_SEARCH_OPTION_VISIBLE';
const SET_NAVIBAR = 'base/SET_NAVIBAR';

export const baseActions = {
  setNaviVisible: createAction<boolean, boolean>(SET_NAVI_VISIBLE, visible => visible),
  setTermVisible: createAction<boolean, boolean>(SET_TERM_VISIBLE, visible => visible),
  setRegisterVisible: createAction<boolean, boolean>(SET_REGISTER_VISIBLE, visible => visible),
  setLoginVisible: createAction<boolean, boolean>(SET_LOGIN_VISIBLE, visible => visible),
  setUserMenuVisible: createAction<boolean, boolean>(SET_USER_MENU_VISIBLE, visible => visible),
  setSearchOptionVisible: createAction<boolean, boolean>(SET_SEARCH_OPTION_VISIBLE, visible => visible),
  setNavibar: createAction<boolean, boolean>(SET_NAVIBAR, visible => visible),
};

type SetNaviVisibleAction = ReturnType<typeof baseActions.setNaviVisible>;
type SetTermVisibleAction = ReturnType<typeof baseActions.setTermVisible>;
type SetRegisterVisibleAction = ReturnType<typeof baseActions.setRegisterVisible>;
type SetLoginVisibleAction = ReturnType<typeof baseActions.setLoginVisible>;
type SetUserMenuVisibleAction = ReturnType<typeof baseActions.setUserMenuVisible>;
type SetSearchOptionVisibleAction = ReturnType<typeof baseActions.setSearchOptionVisible>;
type SetNavibarAction = ReturnType<typeof baseActions.setNavibar>;

export interface IBase {
  navi: boolean;
  term: boolean;
  register: boolean;
  login: boolean;
  userMenu: boolean;
  searchOption: boolean;
  navibar: boolean;
}

const initialState: IBase = {
  navi: true,
  term: false,
  register: false,
  login: false,
  userMenu: false,
  searchOption: false,
  navibar: true,
};

const reducer = handleActions<IBase, any>({
  [SET_NAVI_VISIBLE]: (state: IBase, action: SetNaviVisibleAction) => {
    return produce(state, (draft) => {
      const visible = action.payload!;
      draft.navi = visible;
    });
  },
  [SET_TERM_VISIBLE]: (state: IBase, action: SetTermVisibleAction) => {
    return produce(state, (draft) => {
      const visible = action.payload!;
      draft.term = visible;
    });
  },
  [SET_REGISTER_VISIBLE]: (state: IBase, action: SetRegisterVisibleAction) => {
    return produce(state, (draft) => {
      const visible = action.payload!;
      draft.register = visible;
    });
  },
  [SET_LOGIN_VISIBLE]: (state: IBase, action: SetLoginVisibleAction) => {
    return produce(state, (draft) => {
      const visible = action.payload!;
      draft.login = visible;
    });
  },
  [SET_USER_MENU_VISIBLE]: (state: IBase, action: SetUserMenuVisibleAction) => {
    return produce(state, (draft) => {
      const visible = action.payload!;
      draft.userMenu = visible;
    });
  },
  [SET_SEARCH_OPTION_VISIBLE]: (state: IBase, action: SetSearchOptionVisibleAction) => {
    return produce(state, (draft) => {
      const visible = action.payload!;
      draft.searchOption = visible;
    });
  },
  [SET_NAVIBAR]: (state: IBase, action: SetNavibarAction) => {
    return produce(state, (draft) => {
      const visible = action.payload!;
      draft.navibar = visible;
    });
  },
}, initialState);

export default reducer;