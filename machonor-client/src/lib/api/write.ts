import axios from 'axios';

interface IJusticeWrite {
  title: string;
  postsGoal: string;
  writerDisclosure: string;
  body: string;
}

export const writeJustice = ({ ...rest }: IJusticeWrite) => {
  axios.post('/api/posts/justice/write', { ...rest });
};

export const writeFree = ({ ...rest }) => {
  return axios.post('/api/posts/free/write', { ...rest });
};

export const editFree = (postId: string) => {
  return axios.get(`/api/posts/free/${postId}`);
};