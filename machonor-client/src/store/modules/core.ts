import { handleActions, createAction } from 'redux-actions';
import { applyPenders } from 'redux-pender';
import produce from 'immer';

const SET_LANG = 'core/SET_LANG';
const SET_WIDTH = 'core/SET_WIDTH';
const SET_SCROLL_TOP = 'core/SET_SCROLL_TOP';

export const coreActions = {
  setLang: createAction<string, string>(SET_LANG, value => value),
  setWidth: createAction<number, number>(SET_WIDTH, width => width),
  setScrollTop: createAction<number, number>(SET_SCROLL_TOP, height => height),
};

type SetLangAction = ReturnType<typeof coreActions.setLang>;
type SetWidthAction = ReturnType<typeof coreActions.setWidth>;
type SetScrollTopAction = ReturnType<typeof coreActions.setScrollTop>;

export interface ICore {
  language: string;
  width: number;
  scrollTop: number;
}

const initialState: ICore = {
  language: '',
  width: 1920,
  scrollTop: 1080,
};

const reducer = handleActions<ICore, any>({
  [SET_WIDTH]: (state: ICore, action: SetWidthAction) => {
    return produce(state, (draft) => {
      const width = action.payload!;
      draft.width = width;
    });
  },
  [SET_SCROLL_TOP]: (state: ICore, action: SetScrollTopAction) => {
    return produce(state, (draft) => {
      const height = action.payload!;
      draft.scrollTop = height;
    });
  },
  [SET_LANG]: (state: ICore, action: SetLangAction) => {
    return produce(state, (draft) => {
      const value = action.payload!;
      draft.language = value;
    });
  },
}, initialState);

export default applyPenders(reducer, [

]);