
import { handleActions, createAction } from 'redux-actions';
import { applyPenders } from 'redux-pender';
import produce from 'immer';

const INITIALSTATE = 'write/INITIALSTATE';
const CHANGE_INPUT = 'write/CHANGE_INPUT';
const SET_WRITER_DISCLOSURE = 'write/SET_WRITER_DISCLOSURE';
const SET_BODY = 'write/SET_BODY';
const EDIT_POST = 'write/EDIT_POST';

// free
const SET_ANONYMOUS = 'write/SET_ANONYMOUS';

interface IChangeInput {
  form: string;
  name: string;
  value: string;
}
interface ISetBody {
  name: string;
  value: string;
}
export const writeActions = {
  initialState: createAction(INITIALSTATE),
  setBody: createAction<ISetBody, ISetBody>(SET_BODY, ({ name, value }) => ({ name, value })),
  changeInput: createAction<IChangeInput, IChangeInput>(CHANGE_INPUT, ({ form, name, value }) => ({ form, name, value })),
  setWriterDisclosure: createAction<string, string>(SET_WRITER_DISCLOSURE, name => name),
  setAnonymous: createAction<boolean, boolean>(SET_ANONYMOUS, value => value),
  editPost: createAction<any>(EDIT_POST),
};

type ChangeInputAction = ReturnType<typeof writeActions.changeInput>;
type SetWriterDisclosureAction = ReturnType<typeof writeActions.setWriterDisclosure>;
type SetBodyAction = ReturnType<typeof writeActions.setBody>;
type SetAnonymousAction = ReturnType<typeof writeActions.setAnonymous>;
type EditPostAction = ReturnType<typeof writeActions.editPost>;

export interface IWrite {
  justice: {
    form: {
      title: string;
      postGoal: string;
      writerDisclosure: string;
      body: string;
    };
  };
  free: {
    anonymous: boolean | null;
    form: {
      displayname: string;
      password: string;
      title: string;
      body: string;
    }
  };
}

const initialState: IWrite = {
  justice: {
    form: {
      title: '',
      postGoal: '',
      writerDisclosure: 'open',
      body: '', 
    },
  },
  free: {
    anonymous: null,
    form: {
      displayname: '',
      password: '',
      title: '',
      body: '',
    },
  },
};
const reducer = handleActions<IWrite, any>({
  [INITIALSTATE]: (state) => {
    return initialState;
  },
  [CHANGE_INPUT]: (state: IWrite, action: ChangeInputAction) => {
    return produce(state, (draft) => {
      const { form, name, value } = action.payload!;
      draft[form].form[name] = value;
    });
  },
  [SET_WRITER_DISCLOSURE]: (state: IWrite, action: SetWriterDisclosureAction) => {
    return produce(state, (draft) => {
      const name = action.payload!;
      draft.justice.form.writerDisclosure = name;
    });
  },
  [SET_BODY]: (state: IWrite, action: SetBodyAction) => {
    return produce(state, (draft) => {
      const { name, value } = action.payload!;
      draft[name].form.body = value;
    });
  },
  [SET_ANONYMOUS]: (state: IWrite, action: SetAnonymousAction) => {
    return produce(state, (draft) => {
      const value = action.payload!;
      draft.free.anonymous = value;
    });
  },
}, initialState);

export default applyPenders(reducer, [
  {
    type: EDIT_POST,
    onSuccess: (state: IWrite, action: EditPostAction) => {
      return produce(state, (draft) => {
        const { data } = action.payload!;
        // justice 혹은 free 혹은 notice 값 가져와야함
        console.log(data);
      });
    },
  },
]);