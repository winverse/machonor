import axios from 'axios';

export const writeComment = ({ ...rest }) => {
  return axios.post('/api/posts/comments/write', { ...rest });
};

export const readComments = ({ postId, order }: any) => {
  return axios.get(`/api/posts/comments/read/${postId}/${order}`);
};

export const removeComment = (commentId: string) => {
  return axios.delete(`/api/posts/comments/${commentId}`);
};

export const like = (commentId: string) => {
  return axios.post(`/api/posts/comments/${commentId}/likes`);
};

export const unlike = (commentId: string) => {
  return axios.delete(`/api/posts/comments/${commentId}/likes`);
};