import { BaseApi, UniqueIdentityApi } from '../BaseApi';

const userAuthUrl = '/api/auth/login';
const dataUserUrl = '/api/get/auth/user';
const userTokenUrl = '/api/refresh/token';
const infoUserUrl = '/api/citizens';
const passwordForgotUrl = '/api/users/forgot/password';

const authUser = request => {
  return UniqueIdentityApi.post(userAuthUrl, request);
};

const getUserData = request => {
  return UniqueIdentityApi.get(dataUserUrl, request);
};

const getNewToken = request => {
  return UniqueIdentityApi.get(userTokenUrl);
};

const postUserInfo = request => {
  return BaseApi.post(infoUserUrl, request);
};

const sendResetPassword = request => {
  return UniqueIdentityApi.post(passwordForgotUrl, request);
};

export default {
  authUser,
  getUserData,
  getNewToken,
  postUserInfo,
  sendResetPassword,
};
