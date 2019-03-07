import axios from 'axios';
import * as queryString from 'query-string';

interface IPostsPayload {
  category: string;
  urlSlug: string;
}

export const getPostList = ({ category, page }: IGetPostListPaylaod) => {
  return axios.get(`/api/posts/${category}/?${queryString.stringify({ page })}`);
};

export const readPost = ({ category, urlSlug }: IPostsPayload) => {
  return axios.get(`/api/posts/${category}/${urlSlug}`);
};

export const likePost = ({ category, postId }: ILikePostPayload) => {
  return axios.post(`/api/posts/${category}/${postId}/likes`);
};

export const unlikePost = ({ category, postId }: ILikePostPayload) => {
  return axios.delete(`/api/posts/${category}/${postId}/likes`);
};

export const removePost = ({ category, urlSlug }: IPostsPayload) => {
  return axios.delete(`/api/posts/${category}/${urlSlug}`);
};

export const searchPost = ({ category, criteria, word, page }: ISearchPayload) => {
  return axios.get(`/api/posts/${category}/search/${criteria}/${word}/?${queryString.stringify({ page })}`);
};

interface ILikePostPayload {
  category: string;
  postId: string;
}

interface IGetPostListPaylaod {
  category: string;
  page: number;
}

interface ISearchPayload {
  category: string;
  criteria: string;
  word: string;
  page: number;
}