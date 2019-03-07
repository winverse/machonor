import { handleActions, createAction } from 'redux-actions';
import { applyPenders } from 'redux-pender';
import produce from 'immer';

import * as writeAPI from 'lib/api/write';
import * as postsAPI from 'lib/api/posts';
import * as commentAPI from 'lib/api/commnunity/comment';

// postList action
const GET_POST_LIST = 'posts/GET_POST_LIST';
const SEARCH_MODE = 'posts/SEARCH_MODE';
// postList page set
const SET_PAGE_NUMBER = 'posts/SET_PAGE_NUMBER';

// post action
const INITIALIZE = 'posts/INITIALIZE';
const READ_POST = 'posts/READ_POST';
const UNLOAD_POST = 'posts/UNLOAD_POST';
const TOGGLE_COMMENT = 'posts/TOGGLE_COMMENT';
const SET_POSTID = 'posts/SET_POSTID';
const POST_JUSTICE_WRITE = 'posts/POST_JUSTICE_WRITE';
const POST_FREE_WRITE = 'posts/POST_FREE_WRITE';
const REMOVE_POST = 'posts/REMOVE_POST';
const LIKE_POST = 'posts/LIKE_POST';
const UNLIKE_POST = 'posts/UNLIKE_POST';
const SEARCH_POST = 'posts/SEARCH_POST';

// comment action
const COMMENT_WRITE = 'posts/COMMEN_WRITE';
const READ_COMMENTS = 'posts/READ_COMMNETS';
const REMOVE_COMMENT = 'posts/REMOVE_COMMENT';
const LIKE_COMMENT = 'posts/LIKE_COMMENT';
const UNLIKE_COMMENT = 'posts/UNLIKE_COMMENT';

// navi action
const SET_SCROLL_HEIGHT = 'posts/SET_SCROLL_HEIGHT';

export const postsActions = {
    // postList
  searchMode: createAction<boolean, boolean>(SEARCH_MODE, value => value),
  getPostList: createAction<any, any>(GET_POST_LIST, postsAPI.getPostList),
  setPageNumber: createAction<number, number>(SET_PAGE_NUMBER, value => value),
  // post
  initialize: createAction(INITIALIZE),
  readPost: createAction<any, any>(READ_POST, postsAPI.readPost),
  unloadPost: createAction(UNLOAD_POST),
  toggleComment: createAction<string, string>(TOGGLE_COMMENT, postId => postId),
  setPostId: createAction<string, string>(SET_POSTID, postId => postId),
  postJusticeWrite: createAction<any, any>(POST_JUSTICE_WRITE, writeAPI.writeJustice),
  postFreeWrite: createAction<any, any>(POST_FREE_WRITE, writeAPI.writeFree),
  removePost: createAction<Promise<any>, IRemovePost>(REMOVE_POST, postsAPI.removePost),
  likePost: createAction<any, ILikePost>(LIKE_POST, postsAPI.likePost),
  unlikePost: createAction<any, ILikePost>(UNLIKE_POST, postsAPI.unlikePost),
  searchPost: createAction<any, ISearchPaylaod>(SEARCH_POST, postsAPI.searchPost),
  // comment
  commentWrite: createAction<any, any>(COMMENT_WRITE, commentAPI.writeComment),
  readComments: createAction<any, any>(READ_COMMENTS, commentAPI.readComments),
  removeComment: createAction<any, any, any>(REMOVE_COMMENT, commentAPI.removeComment, payload => payload),
  likeComment: createAction<any, any, any>(LIKE_COMMENT, commentAPI.like, payload => payload),
  unlikeComment: createAction<any, any, any>(UNLIKE_COMMENT, commentAPI.unlike, payload => payload),
  // navi
  setScrollHeight: createAction<ISetScrollPayload, ISetScrollPayload>(SET_SCROLL_HEIGHT, ({ name, height }) => ({ name, height })),
};

interface IRemovePost {
  category: string;
  urlSlug: string;
}
interface ILikePost {
  category: string;
  postId: string;
}
interface ISearchPaylaod {
  category: string;
  criteria: string;
  word: string;
  page: number;
}
interface ISetScrollPayload {
  name: 'scrollTop' | 'navTop' | 'buyerTop' | 'alikeTop' | 'NGOTop' | 'summaryTop';
  height: number;
}

type GetPostListAction = ReturnType<typeof postsActions.getPostList>;
type SearchModeAction = ReturnType<typeof postsActions.searchMode>;
type SetPageNumberAction = ReturnType<typeof postsActions.setPageNumber>;
type ReadPostAction = ReturnType<typeof postsActions.readPost>;
type ToggleCommentAction = ReturnType<typeof postsActions.toggleComment>;
type SetPostIdAction = ReturnType<typeof postsActions.setPostId>;
type PostJusticeWriteAction = ReturnType<typeof postsActions.postJusticeWrite>;
type RemovePostAction = ReturnType<typeof postsActions.removePost>;
type PostFreeWriteAction = ReturnType<typeof postsActions.postFreeWrite>;
type LikePostAction = ReturnType<typeof postsActions.likePost>;
type UnLikePostAction = ReturnType<typeof postsActions.unlikePost>;
type SearchPostAction = ReturnType<typeof postsActions.searchPost>;

type CommentWriteAction = ReturnType<typeof postsActions.commentWrite>;
type ReadCommentAction = ReturnType<typeof postsActions.readComments>;
type RemoveCommentAction = ReturnType<typeof postsActions.removeComment>;
type LikeCommentAction = ReturnType<typeof postsActions.likeComment>;
type UnlikeCommentAction = ReturnType<typeof postsActions.unlikeComment>;

type SetScrollHeightAction = ReturnType<typeof postsActions.setScrollHeight>;

interface IPostData {
  id: string;
  title: string;
  displayname: string;
  password?: string | null;
  body: string;
  urlSlug: string;
  anonymous: boolean;
  ipAddress: string;
  likesCount: number;
  totalViews: number;
  createdAt: any;
  liked: boolean;
  User: {
    id: string;
    UserProfile: {
      displayname: string;
      thumbnail: string;
      shortBio: string;
    };
  };
}

export interface IPosts {
  searchMode: boolean;
  postData: IPostData;
  posts: any[];
  comments: {
    rows?: any[];
    count?: number;
  };
  navi: {
    scrollTop: number;
    navTop: number;
    buyerTop: number;
    summaryTop: number;
    NGOTop: number;
    alikeTop: number;
  };
  page: number;
  lastPage: number;
}

const initialState: IPosts = {
  searchMode: false,
  postData: {
    id: '',
    title: '',
    body: '',
    displayname: '',
    password: null,
    urlSlug: '',
    anonymous: false,
    createdAt: null,
    likesCount: 0,
    totalViews: 0,
    ipAddress: '',
    liked: false,
    User: {
      id: '',
      UserProfile: {
        displayname: '',
        shortBio: '',
        thumbnail: '',
      },
    },
  },
  posts: [],
  comments: {},
  navi: {
    scrollTop: 0,
    navTop: 0,
    buyerTop: 0,
    alikeTop: 0,
    NGOTop: 0,
    summaryTop: 0,
  },
  page: 1,
  lastPage: 1,
};
const reducer = handleActions<IPosts, any>({
  [UNLOAD_POST]: (state: IPosts) => {
    return produce(state, (draft) => {
      draft.postData = initialState.postData;
    });
  },
  [SEARCH_MODE]: (state: IPosts, action: SearchModeAction) => {
    return produce(state, (draft) => {
      const value = action.payload!;
      draft.searchMode = value;
    });
  },
  [SET_PAGE_NUMBER]: (state: IPosts, action: SetPageNumberAction) => {
    return produce(state, (draft) => {
      const value = action.payload!;
      draft.page = value;  
    });
  },
  [SET_POSTID]: (state: IPosts, action: SetPostIdAction) => {
    return produce(state, (draft) => {
      const postId = action.payload!;
      if (!draft.comments) return;
      draft.comments[postId] = {
        visible: false,
      };
    });
  },
  [TOGGLE_COMMENT]: (state: IPosts, action: ToggleCommentAction) => {
    return produce(state, (draft) => {
      const postId = action.payload!;
      const comment = draft.comments[postId];
      if (!comment) return;
      draft.comments[postId].visible = !draft.comments[postId].visible;
    });
  },
  [SET_SCROLL_HEIGHT]: (state: IPosts, action: SetScrollHeightAction) => {
    return produce(state, (draft) => {
      const { name, height } = action.payload!;
      draft.navi[name] = height;
    });
  },
}, initialState);

export default applyPenders(reducer, [
  {
    type: GET_POST_LIST,
    onSuccess: (state: IPosts, action: GetPostListAction) => {
      return produce(state, (draft) => {
        const { data } = action.payload!;
        draft.posts = data.list;
        draft.lastPage = data.lastPage;
      });
    },
  },
  {
    type: POST_JUSTICE_WRITE,
    onSuccess: (state: IPosts, action: PostJusticeWriteAction) => {
      return produce(state, (draft) => {
        const { data } = action.payload;
        draft.postData = data;
      });
    },
  },
  {
    type: POST_FREE_WRITE,
    onSuccess: (state: IPosts, action: PostFreeWriteAction) => {
      return produce(state, (draft) => {
        const { data } = action.payload;
        draft.postData = data;
      });
    },
  },
  {
    type: READ_POST,
    onSuccess: (state: IPosts, action: ReadPostAction) => {
      return produce(state, (draft) => {
        const { data } = action.payload!;
        draft.postData = data;
      });
    },
  },
  {
    type: SEARCH_POST,
    onSuccess: (state: IPosts, action: SearchPostAction) => {
      return produce(state, (draft) => {
        const { data } = action.payload!;
        const { lastPage, list } = data;
        draft.posts = list;
        draft.lastPage = lastPage;
      });
    },
  },
  {
    type: REMOVE_POST,
    onSuccess: (state: IPosts, action: RemovePostAction) => {
      return produce(state, (draft) => {
        initialState;
      });
    },
  },
  {
    type: LIKE_POST,
    onPending: (state: IPosts, action: LikePostAction) => {
      return produce(state, (draft) => {
        const nowCount = state.postData.likesCount;
        draft.postData.likesCount = nowCount + 1;
        draft.postData.liked = true;
      });
    },
    onSuccess: (state: IPosts, action: LikePostAction) => {
      return produce(state, (draft) => {
        const { data } = action.payload!;
        const check = draft.postData.likesCount === data;
        if (!check) return;
      });
    },
  },
  {
    type: UNLIKE_POST,
    onPending: (state: IPosts, action: UnLikePostAction) => {
      return produce(state, (draft) => {
        const nowCount = state.postData.likesCount;
        draft.postData.likesCount = nowCount - 1;
        draft.postData.liked = false;
      });
    },
    onSuccess: (state: IPosts, action: UnLikePostAction) => {
      return produce(state, (draft) => {
        const { data } = action.payload!;
        const check = draft.postData.likesCount === data;
        if (!check) return;
      });
    },
  },
  {
    type: COMMENT_WRITE,
    onSuccess: (state: IPosts, action: CommentWriteAction) => {
      return produce(state, (draft) => {
        const { data } = action.payload!;
        if (data.commentId) {
          if (!draft.comments.rows) return;
          if (data.comment.level === 0) {
            const index = draft.comments.rows!.findIndex(comment => comment.id === data.comment.id);
            delete draft.comments.rows[index].text;
            delete draft.comments.rows[index].displayname;
            delete draft.comments.rows[index].password;
            const text = data.comment.text;
            const displayname = data.comment.displayname;
            const password = data.comment.password;
            Object.assign(draft.comments.rows[index], { text, displayname, password });
            return;
          }
          if (data.comment.level === 1) {
            const index = draft.comments.rows!.findIndex(comment => comment.id === data.comment.replyTo);
            const innerIndex = draft.comments.rows[index].reply.findIndex((recomment: any) => recomment.id === data.comment.id);
            delete draft.comments.rows[index].reply[innerIndex].text;
            delete draft.comments.rows[index].reply[innerIndex].password;
            delete draft.comments.rows[index].reply[innerIndex].displayname;
            const text = data.comment.text;
            const displayname = data.comment.displayname;
            const password = data.comment.password;
            Object.assign(draft.comments.rows[index].reply[innerIndex], { text, displayname, password });
            return;
          }
          return;
        }
        if (data.level === 0 && !data.commentId) {
          const parse = { reply: [] };
          const parseData = Object.assign(data, parse);
          draft.comments.rows!.unshift(parseData);
          draft.comments.count = state.comments.count! + 1;
          return;
        }
        if (data.level === 1 && !data.commentId) {
          const index = state.comments.rows!.findIndex(comment => comment.id === data.replyTo);
          draft.comments.rows![index].reply.unshift(data);
          return;
        }
      });
    },
  },
  {
    type: READ_COMMENTS,
    onSuccess: (state: IPosts, action: ReadCommentAction) => {
      return produce(state, (draft) => {
        const { data } = action.payload!;
        draft.comments = data;
      });
    },
  },
  {
    type: REMOVE_COMMENT,
    onSuccess: (state: IPosts, action: RemoveCommentAction) => {
      return produce(state, (draft) => {
        const { data } = action.payload!;
        if (data.level === 0) {
          if (!state.comments.rows) return;
          const index = state.comments.rows!.findIndex(comment => comment.id === action.meta);
          draft.comments.rows![index].deletedAt = data.deletedAt;
          return;
        }
        if (data.level === 1) {
          const rows = state.comments.rows;
          if (!rows) return;
          const index = rows.findIndex(comment => comment.id === data.replyTo);
          const innerIndex = rows[index].reply.findIndex((comment: any) => comment.id === action.meta);
          draft.comments.rows![index].reply[innerIndex].deletedAt = data.deletedAt;
          return;
        }
      });
    },
  },
  {
    type: LIKE_COMMENT, 
    onPending: (state: IPosts, action: LikeCommentAction) => {
      return produce(state, (draft) => {
        const index = state.comments.rows!.findIndex(comment => comment.id === action.meta);
        if (!draft.comments.rows) return;
        const nowCount: number = draft.comments.rows[index].likesCount;
        draft.comments.rows[index].likesCount = nowCount + 1;
        draft.comments.rows[index].liked = true;
      });
    },
    onSuccess: (state: IPosts, action: LikeCommentAction) => {
      return produce(state, (draft) => {
        const index = state.comments.rows!.findIndex(comment => comment.id === action.meta);
        if (!draft.comments.rows) return;
        const { data } = action.payload;
        const checked = draft.comments.rows[index].likesCount === data.likesCount;
        if (!checked) return;
      });
    },
  },
  {
    type: UNLIKE_COMMENT,
    onPending: (state: IPosts, action: UnlikeCommentAction) => {
      return produce(state, (draft) => {
        const index = state.comments.rows!.findIndex(comment => comment.id === action.meta);
        if (!draft.comments.rows) return;
        const nowCount: number = draft.comments.rows[index].likesCount;
        draft.comments.rows[index].likesCount = nowCount - 1;
        draft.comments.rows[index].liked = false;
      });
    },
    onSuccess: (state: IPosts, action: LikeCommentAction) => {
      return produce(state, (draft) => {
        const index = state.comments.rows!.findIndex(comment => comment.id === action.meta);
        if (!draft.comments.rows) return;
        const { data } = action.payload;
        const checked = draft.comments.rows[index].likesCount === data.likesCount;
        if (!checked) return;
      });
    },
  },
]);