import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { SignupInitialState } from './InitialState';

const signupLoading = (state: SignupInitialState, action: ActionObject) => ({
  ...state,
  signupLoading: true,
  signupError: INITIAL_STATE.signupError,
});

const signupSuccess = (state: SignupInitialState, action: ActionObject) => ({
  ...state,
  signupData: action.payload,
  signupLoading: false,
  signupError: INITIAL_STATE.signupError,
});

const signupFailure = (state: SignupInitialState, action: ActionObject) => ({
  ...state,
  signupData: INITIAL_STATE.signupData,
  signupLoading: false,
  signupError: action.payload,
});

const documentLoading = (state: SignupInitialState, action: ActionObject) => ({
  ...state,
  documentData: INITIAL_STATE.documentData,
  documentLoading: action.payload,
  documentError: INITIAL_STATE.documentError,
});

const documentSuccess = (state: SignupInitialState, action: ActionObject) => ({
  ...state,
  documentData: action.payload,
  documentLoading: INITIAL_STATE.documentLoading,
  documentError: INITIAL_STATE.documentError,
});

const documentFailure = (state: SignupInitialState, action: ActionObject) => ({
  ...state,
  documentData: INITIAL_STATE.documentData,
  documentLoading: INITIAL_STATE.documentLoading,
  documentError: action.payload,
});

const municipalityLoading = (state: SignupInitialState, action: ActionObject) => ({
  ...state,
  municipalityLoading: true,
  municipalityError: INITIAL_STATE.municipalityError,
});

const municipalitySuccess = (state: SignupInitialState, action: ActionObject) => ({
  ...state,
  municipalityData: action.payload,
  municipalityLoading: false,
  municipalityError: INITIAL_STATE.municipalityError,
});

const municipalityFailure = (state: SignupInitialState, action: ActionObject) => ({
  ...state,
  municipalityData: INITIAL_STATE.municipalityData,
  municipalityLoading: false,
  municipalityError: action.payload,
});

const sectorLoading = (state: SignupInitialState, action: ActionObject) => ({
  ...state,
  sectorLoading: true,
  sectorError: INITIAL_STATE.sectorError,
});

const sectorSuccess = (state: SignupInitialState, action: ActionObject) => ({
  ...state,
  sectorData: action.payload,
  sectorLoading: false,
  sectorError: INITIAL_STATE.sectorError,
});

const sectorFailure = (state: SignupInitialState, action: ActionObject) => ({
  ...state,
  sectorData: INITIAL_STATE.sectorData,
  sectorLoading: false,
  sectorError: action.payload,
});

const postLoading = (state: SignupInitialState, action: ActionObject) => ({
  ...state,
  postLoading: true,
  postError: INITIAL_STATE.postError,
});

const postSuccess = (state: SignupInitialState, action: ActionObject) => ({
  ...state,
  postData: action.payload,
  postLoading: false,
  postError: INITIAL_STATE.postError,
});

const postFailure = (state: SignupInitialState, action: ActionObject) => ({
  ...state,
  postData: INITIAL_STATE.postData,
  postLoading: false,
  postError: action.payload,
});

const signupCleanUp = (state: any, payload: { pin: string, type: string }) => ({
  ...state,
  ...INITIAL_STATE,
});

export const SignupReducer = createReducer(INITIAL_STATE, {
  [Types.SIGNUP_LOADING]: signupLoading,
  [Types.SIGNUP_SUCCESS]: signupSuccess,
  [Types.SIGNUP_FAILURE]: signupFailure,

  [Types.DOCUMENT_VALIDATE_LOADING]: documentLoading,
  [Types.DOCUMENT_VALIDATE_SUCCESS]: documentSuccess,
  [Types.DOCUMENT_VALIDATE_FAILURE]: documentFailure,

  [Types.MUNICIPALITY_LOADING]: municipalityLoading,
  [Types.MUNICIPALITY_SUCCESS]: municipalitySuccess,
  [Types.MUNICIPALITY_FAILURE]: municipalityFailure,

  [Types.SECTOR_LOADING]: sectorLoading,
  [Types.SECTOR_SUCCESS]: sectorSuccess,
  [Types.SECTOR_FAILURE]: sectorFailure,

  [Types.REGISTER_LOADING]: postLoading,
  [Types.REGISTER_SUCCESS]: postSuccess,
  [Types.REGISTER_FAILURE]: postFailure,

  [Types.SIGNUP_CLEAN_UP]: signupCleanUp,
});
