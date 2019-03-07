import asyncComponent from 'lib/asyncComponent';

// 정의를 산다는 건
export const Explanation = asyncComponent(() => import('./Explanation'));

// 정의 프로젝트
export const Main = asyncComponent(() => import('./Main'));
export const Buying = asyncComponent(() => import('./Buying'));
export const Judging = asyncComponent(() => import('./Judging'));
export const Completed = asyncComponent(() => import('./Completed'));
export const JusticeWrite = asyncComponent(() => import('./JusticeWrite'));

// 정의 구매제안
export const Reserve = asyncComponent(() => import('./Reserve'));
export const Proposal = asyncComponent(() => import('./Proposal'));

// 커뮤니티
export const Free = asyncComponent(() => import('./Free'));
export const FreeWrite = asyncComponent(() => import('./FreeWrite'));
export const FreePost = asyncComponent(() => import('./FreePost'));
export const Notice = asyncComponent(() => import('./Notice'));
export const NoticePost = asyncComponent(() => import('./NoticePost'));

// 위원회
export const Introduce = asyncComponent(() => import('./Introduce'));
export const Committe = asyncComponent(() => import('./Committe'));
export const Request = asyncComponent(() => import('./Request'));
export const Space = asyncComponent(() => import('./Space'));

// 기타 페이지
export const Post = asyncComponent(() => import('./Post'));
export const User = asyncComponent(() => import('./User'));
