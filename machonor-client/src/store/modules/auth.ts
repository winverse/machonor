import { handleActions, createAction } from 'redux-actions';
import { applyPenders } from 'redux-pender';
import produce from 'immer';

import * as authAPI from 'lib/api/auth';

// for term
const CHAGNE_CHECKBOX = 'auth/CHAGNE_CHECKBOX';
const SET_TERM_ERROR = 'auth/SET_TERM_ERROR';
const INITIALCHECK = 'auth/INITIALCHECK';
// for register
const CHAGNE_INPUT = 'auth/CHANGE_INPUT';
const CHECK_USERID_EXISTS = 'auth/CHECK_USERID_EXISTS';
const CHECK_DISPLAYNAME_EXISTS = 'auth/CHECK_DISPLAYNAME_EXISTS';
const CHECK_EMAIL_EXISTS = 'auth/CHECK_EMAIL_EXISTS';
const SET_ERROR = 'auth/SET_ERROR';
const LOCAL_REGISTER = 'auth/LOCAL_REGISTER';
// for login
const LOCAL_LOGIN = 'auth/LOCAL_LOGIN';
const SEND_EMAIL_AUTH = 'auth/SEND_EMAIL_AUTH';

interface IChangeCheckBox {
  name: string;
  value: boolean;
}
interface IChangeInput {
  form: string;
  name: string;
  value: string;
}
interface IErrorInfo {
  form: string;
  name: string;
  message: string;
}

export const authActions = {
  changeCheckbox: createAction<IChangeCheckBox, IChangeCheckBox>(CHAGNE_CHECKBOX, ({ name, value }) => ({ name, value })),
  setTermError: createAction<string, string>(SET_TERM_ERROR, value => value),
  initialCheck: createAction(INITIALCHECK),
  checkUseridExists: createAction<any, string>(CHECK_USERID_EXISTS, authAPI.checkUseridExists),
  checkDisplaynameExists: createAction<any, string>(CHECK_DISPLAYNAME_EXISTS, authAPI.checkDisplaynameExists),
  checkEmailExists: createAction<any, string>(CHECK_EMAIL_EXISTS, authAPI.checkEmailExsts),
  changeInput: createAction<IChangeInput, IChangeInput>(CHAGNE_INPUT, ({
    form,
    name,
    value,
  }) => ({ form, name, value })),
  setError: createAction<IErrorInfo, IErrorInfo>(SET_ERROR, ({ 
    form,
    name, 
    message,
  }) => ({ form, name, message })),
  localRegister: createAction<any, any>(LOCAL_REGISTER, authAPI.localRegister),
  localLogin: createAction<any, any>(LOCAL_LOGIN, authAPI.localLogin), 
  sendEmailAuth: createAction<any, string>(SEND_EMAIL_AUTH, authAPI.sendEmailAuth),
};

type ChangeCheckboxAction = ReturnType<typeof authActions.changeCheckbox>;
type SetTermErrorAction = ReturnType<typeof authActions.setTermError>;
type ChangeInputAction = ReturnType<typeof authActions.changeInput>;
type CheckUseridExistsAction = ReturnType<typeof authActions.checkUseridExists>;
type CheckDisplaynameExistsAction = ReturnType<typeof authActions.checkDisplaynameExists>;
type CheckEmailExistsAction = ReturnType<typeof authActions.checkEmailExists>;
type SetErrorAction = ReturnType<typeof authActions.setError>;
type LocalRegisterAction = ReturnType<typeof authActions.localRegister>;
type LocalLoginAction = ReturnType<typeof authActions.localLogin>;
type SendEmailAuthAction = ReturnType<typeof authActions.sendEmailAuth>;

export interface IAuth {
  term: {
    checked: {
      all: boolean;
      utilization: boolean;
      personalInfo: boolean;
    }
    error: string;
  };
  register: {
    form: {
      userid: string;
      displayname: string;
      email: string;
      password: string;
      passwordConfirm: string;
    };
    exists: {
      userid: boolean,
      displayname: boolean,
      email: boolean;
    };
    error: {
      userid: string;
      displayname: string;
      email: string;
      password: string;
      passwordConfirm: string;
    };
  };
  login: {
    form: {
      userid: string;
      password: string;
    };
    error: {
      message: string;
    }
  };
  reuslt: {
    userId: string;
    displayname: string;
    thumbnail: string;
    shortBio: string;
    amount: number;
    level: number;
  };
}

const initialState: IAuth = {
  term: {
    checked: {
      all: false,
      utilization: false,
      personalInfo: false,
    },
    error: '',
  },
  register: {
    form: {
      userid: '',
      displayname: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    exists: {
      userid: false,
      displayname: false,
      email: false,
    },
    error: {
      userid: '',
      displayname: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  },
  login: {
    form: {
      userid: '',
      password: '',
    },
    error: {
      message: '',
    },
  },
  reuslt: {
    userId: '',
    displayname: '',
    thumbnail: '',
    shortBio: '',
    amount: 0,
    level: 1,
  },
};

const reducer = handleActions<IAuth, any>({
  [CHAGNE_CHECKBOX]: (state: IAuth, action: ChangeCheckboxAction) => {
    return produce(state, (draft) => {
      const { name, value } = action.payload!;
      draft.term.checked[name] = value;
    });
  },
  [SET_TERM_ERROR]: (state: IAuth, action: SetTermErrorAction) => {
    return produce(state, (draft) => {
      const value = action.payload!;
      draft.term.error = value;
    });
  },
  [INITIALCHECK]: () => initialState,
  [CHAGNE_INPUT]: (state: IAuth, action: ChangeInputAction) => {
    return produce(state, (draft) => {
      const { form, name, value } = action.payload!;
      draft[form].form[name] = value;
    });
  },
  [SET_ERROR]: (state: IAuth, action: SetErrorAction) => {
    return produce(state, (draft) => {
      const { form, name, message } = action.payload!;
      draft[form].error[name] = message;
    });
  },
}, initialState);

export default applyPenders(reducer, [
  {
    type: CHECK_USERID_EXISTS,
    onSuccess: (state: IAuth, action: CheckUseridExistsAction) => {
      return produce(state, (draft) => { 
        const { data: { exists } } = action.payload!;
        draft.register.exists.userid = exists;
      });
    },
  },
  {
    type: CHECK_DISPLAYNAME_EXISTS,
    onSuccess: (state: IAuth, action: CheckDisplaynameExistsAction) => {
      return produce(state, (draft) => { 
        const { data: { exists } } = action.payload!;
        draft.register.exists.displayname = exists;
      });
    },
  },
  {
    type: CHECK_EMAIL_EXISTS,
    onSuccess: (state: IAuth, action: CheckEmailExistsAction) => {
      return produce(state, (draft) => { 
        const { data: { exists } } = action.payload!;
        draft.register.exists.email = exists;
      });
    },
  },
  {
    type: LOCAL_REGISTER,
    onSuccess: (state: IAuth, action: LocalRegisterAction) => {
      return produce(state, (draft) => {
        const { data } = action.payload;
        draft.reuslt = data;
      });
    },
  },
  {
    type: LOCAL_LOGIN,
    onSuccess: (state: IAuth, action: LocalLoginAction) => {
      return produce(state, (draft) => {
        const { data } = action.payload!;
        draft.reuslt = data; 
      });
    },
  },
  {
    type: SEND_EMAIL_AUTH,
    onSuccess: (state: IAuth, action: SendEmailAuthAction) => {
      return produce(state, (draft) => {
        console.log(draft);
      });
    },
  },
]);
