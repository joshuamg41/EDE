import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../StoreConstants';
import { UserPropType } from './InitialState';

const Types = {
  LOGIN: 'LOGIN',
  LOGIN_LOADING: 'LOGIN_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',

  SET_PIN: 'SET_PIN',
  REFRESH_USER_DATA: 'REFRESH_USER_DATA',
  REFRESH_USER_DATA_SUCCESS: 'REFRESH_USER_DATA_SUCCESS',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
  REFRESH_USER_TOKEN: 'REFRESH_USER_TOKEN',
  SIGNIN_CLEAN_UP: 'SIGNIN_CLEAN_UP',
  LOGOUT_DESTROY_DATA: 'LOGOUT_DESTROY_DATA',

  CALL_FORGOT_PASSWORD: 'CALL_FORGOT_PASSWORD',
  FORGOT_PASSWORD_LOADING: 'FORGOT_PASSWORD_LOADING',
  FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS',
  FORGOT_PASSWORD_FAILURE: 'FORGOT_PASSWORD_FAILURE',
}

const Creators = {
  login: createAction<any>(Types.LOGIN),
  loginLoading: createAction(Types.LOGIN_LOADING),
  loginSuccess: createAction<UserPropType>(Types.LOGIN_SUCCESS),
  loginFailure: createAction<ErrorObject>(Types.LOGIN_FAILURE),

  setPin: createAction<string>(Types.SET_PIN),

  refreshUserData: createAction<any>(Types.REFRESH_USER_DATA),
  refreshUserDataSuccess: createAction<string>(Types.REFRESH_USER_DATA_SUCCESS),

  refreshToken: createAction(Types.REFRESH_TOKEN),
  refreshUserToken: createAction<string>(Types.REFRESH_USER_TOKEN),

  signinCleanUp: createAction(Types.SIGNIN_CLEAN_UP),
  logoutDestroyData: createAction(Types.LOGOUT_DESTROY_DATA),

  callForgotPassword: createAction<any>(Types.CALL_FORGOT_PASSWORD),
  forgotPasswordLoading: createAction(Types.FORGOT_PASSWORD_LOADING),
  forgotPasswordSuccess: createAction<any>(Types.FORGOT_PASSWORD_SUCCESS),
  forgotPasswordFailure: createAction<ErrorObject>(Types.FORGOT_PASSWORD_FAILURE),
}

export { Types };
export default Creators;