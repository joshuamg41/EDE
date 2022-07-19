import { createReducer } from '@reduxjs/toolkit';
import { localToObject } from '../../utils/ObjectUtil';
import { ActionObject } from '../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { SigninInitialState } from './InitialState';

const loginLoading = (state: SigninInitialState, action: ActionObject) => ({
  ...state,
  isLoading: true,
  error: INITIAL_STATE.error,
});

const loginSuccess = (state: SigninInitialState, action: ActionObject) => ({
  ...state,
  user: {
    ...state.user,
    ...action.payload,
  },
  isLoading: false,
  error: INITIAL_STATE.error,
});

const loginFailure = (state: SigninInitialState, action: ActionObject) => ({
  ...state,
  user: INITIAL_STATE.user,
  isLoading: false,
  error: action.payload,
});

const setPin = (state: SigninInitialState, action: ActionObject) => ({
  ...state,
  user: {
    ...state.user,
    pin: action.payload,
  },
});

const userDataSuccess = (state: SigninInitialState, action: ActionObject) => ({
  ...state,
  user: {
    ...state.user,
    data: {
      ...localToObject(state.user.data),
      ...action.payload,
    }
  },
})

const refreshUserToken = (state: SigninInitialState, action: ActionObject) => ({
  ...state,
  user: {
    ...state.user,
    token: action.payload,
  },
});

const signinCleanUp = (state: SigninInitialState, action: ActionObject) => ({
  ...state,
  ...INITIAL_STATE,
});

const forgotLoading = (state: SigninInitialState, action: ActionObject) => ({
  ...state,
  forgotLoading: true,
  forgotError: INITIAL_STATE.forgotError,
});

const forgotSuccess = (state: SigninInitialState, action: ActionObject) => ({
  ...state,
  forgotData: action.payload,
  forgotLoading: false,
  forgotError: INITIAL_STATE.forgotError,
});

const forgotFailure = (state: SigninInitialState, action: ActionObject) => ({
  ...state,
  forgotData: INITIAL_STATE.forgotData,
  forgotLoading: false,
  forgotError: action.payload,
});


export const SigninReducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_LOADING]: loginLoading,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.SET_PIN]: setPin,

  [Types.REFRESH_USER_DATA_SUCCESS]: userDataSuccess,

  [Types.REFRESH_USER_TOKEN]: refreshUserToken,

  [Types.SIGNIN_CLEAN_UP]: signinCleanUp,

  [Types.FORGOT_PASSWORD_LOADING]: forgotLoading,
  [Types.FORGOT_PASSWORD_SUCCESS]: forgotSuccess,
  [Types.FORGOT_PASSWORD_FAILURE]: forgotFailure,
});