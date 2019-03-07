import axios from 'axios';

interface ILocalRegister {
  userid: string;
  displayname: string;
  password: string;
  email: string;
}

export const sendEmailAuth = (email: string) => {
  return axios.post('/api/auth/send-email-auth', { email });
};

export const checkUseridExists = (userid: string) => {
  return axios.get(`/api/auth/exists/userid/${userid}`);
};

export const checkDisplaynameExists = (displayname: string) => {
  return axios.get(`/api/auth/exists/displayname/${displayname}`);
};

export const checkEmailExsts = (email: string) => {
  return axios.get(`/api/auth/exists/email/${email}`);
};

export const localRegister = ({ ...rest }: ILocalRegister) => {
  return axios.post('/api/auth/register/local', { ...rest });
};

export const localLogin = ({ ...rest }) => {
  return axios.post('/api/auth/login/local', { ...rest });
};