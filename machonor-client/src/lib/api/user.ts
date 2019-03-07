import axios from 'axios';

export const checkStatus = () => axios.get('/api/users/check');

export const logout = () => axios.post('/api/users/logout');

export const getUser = (displayname: string) => axios.get(`/api/users/${displayname}`);