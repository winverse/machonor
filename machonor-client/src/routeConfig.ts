import { bindActionCreators } from 'redux';
import { postsActions } from './store/modules/posts';

import {
  Main,
  Buying,
  Judging,
  Completed,
  Free,
} from './pages';

const routes = [
  {
    path: '/main',
    exact: true,
    component: Main,
  },
  {
    path: '/main/buying',
    component: Buying,
  },
  {
    path: '/main/judging',
    component: Judging,
  },
  {
    path: '/main/completed',
    component: Completed,
  },
  {
    exact: true,
    path: '/community/free',
    component: Free,
    preload: ({ dispatch }: any, params: any, ctx: any) => {
      console.log('실행');
      const PostsActions = bindActionCreators(postsActions, dispatch);
      return PostsActions.getPostList({
        category: 'free',
        page: 1,
      });
    },
  },
];

export default routes;