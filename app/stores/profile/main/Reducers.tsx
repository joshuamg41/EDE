import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { ProfileInitialState } from './InitialState';

const getLoading = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: action.payload,
});

const newPasswordLoading = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  newPasswordData: INITIAL_STATE.newPasswordData,
  newPasswordLoading: true,
  newPasswordError: INITIAL_STATE.newPasswordError,
});

const newPasswordSuccess = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  newPasswordData: action.payload,
  newPasswordLoading: false,
  newPasswordError: INITIAL_STATE.newPasswordError,
});

const newPasswordFailure = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  newPasswordData: INITIAL_STATE.newPasswordData,
  newPasswordLoading: false,
  newPasswordError: action.payload,
});

const newEmailLoading = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  newEmailData: INITIAL_STATE.newEmailData,
  newEmailLoading: true,
  newEmailError: INITIAL_STATE.newEmailError,
});

const newEmailSuccess = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  newEmailData: action.payload,
  newEmailLoading: false,
  newEmailError: INITIAL_STATE.newEmailError,
});

const newEmailFailure = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  newEmailData: INITIAL_STATE.newEmailData,
  newEmailLoading: false,
  newEmailError: action.payload,
});

const newCompanyLoading = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  newCompanyData: INITIAL_STATE.newCompanyData,
  newCompanyLoading: true,
  newCompanyError: INITIAL_STATE.newCompanyError,
});

const newCompanySuccess = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  newCompanyData: action.payload,
  newCompanyLoading: false,
  newCompanyError: INITIAL_STATE.newCompanyError,
});

const newCompanyFailure = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  newCompanyData: INITIAL_STATE.newCompanyData,
  newCompanyLoading: false,
  newCompanyError: action.payload,
});

export const ProfileMainReducer = createReducer(INITIAL_STATE, {
  [Types.PROFILE_MAIN_LOADING]: getLoading,
  [Types.PROFILE_MAIN_SUCCESS]: getSuccess,
  [Types.PROFILE_MAIN_FAILURE]: getFailure,

  [Types.NEW_PASSWORD_LOADING]: newPasswordLoading,
  [Types.NEW_PASSWORD_SUCCESS]: newPasswordSuccess,
  [Types.NEW_PASSWORD_FAILURE]: newPasswordFailure,

  [Types.NEW_EMAIL_LOADING]: newEmailLoading,
  [Types.NEW_EMAIL_SUCCESS]: newEmailSuccess,
  [Types.NEW_EMAIL_FAILURE]: newEmailFailure,

  [Types.NEW_COMPANY_LOADING]: newCompanyLoading,
  [Types.NEW_COMPANY_SUCCESS]: newCompanySuccess,
  [Types.NEW_COMPANY_FAILURE]: newCompanyFailure,
});
