import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../StoreConstants';

const Types = {
  GET_SIGNUP: 'GET_SIGNUP',
  SIGNUP_LOADING: 'SIGNUP_LOADING',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_FAILURE: 'SIGNUP_FAILURE',
  
  GET_DOCUMENT_VALIDATE: 'GET_DOCUMENT_VALIDATE',
  DOCUMENT_VALIDATE_LOADING: 'DOCUMENT_VALIDATE_LOADING',
  DOCUMENT_VALIDATE_SUCCESS: 'DOCUMENT_VALIDATE_SUCCESS',
  DOCUMENT_VALIDATE_FAILURE: 'DOCUMENT_VALIDATE_FAILURE',

  GET_MUNICIPALITY: 'GET_MUNICIPALITY',
  MUNICIPALITY_LOADING: 'MUNICIPALITY_LOADING',
  MUNICIPALITY_SUCCESS: 'MUNICIPALITY_SUCCESS',
  MUNICIPALITY_FAILURE: 'MUNICIPALITY_FAILURE',

  GET_SECTOR: 'GET_SECTOR',
  SECTOR_LOADING: 'SECTOR_LOADING',
  SECTOR_SUCCESS: 'SECTOR_SUCCESS',
  SECTOR_FAILURE: 'SECTOR_FAILURE',

  POST_REGISTER: 'POST_REGISTER',
  REGISTER_LOADING: 'REGISTER_LOADING',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',

  SIGNUP_CLEAN_UP: 'SIGNUP_CLEAN_UP',
}

const Creators = {
  getSignup: createAction(Types.GET_SIGNUP),
  signupLoading: createAction(Types.SIGNUP_LOADING),
  signupSuccess: createAction<any>(Types.SIGNUP_SUCCESS),
  signupFailure: createAction<ErrorObject>(Types.SIGNUP_FAILURE),

  getDocumentValidate: createAction<any>(Types.GET_DOCUMENT_VALIDATE),
  documentValidateLoading: createAction<any>(Types.DOCUMENT_VALIDATE_LOADING),
  documentValidateSuccess: createAction<any>(Types.DOCUMENT_VALIDATE_SUCCESS),
  documentValidateFailure: createAction<ErrorObject>(Types.DOCUMENT_VALIDATE_FAILURE),

  getMunicipality: createAction<any>(Types.GET_MUNICIPALITY),
  municipalityLoading: createAction(Types.MUNICIPALITY_LOADING),
  municipalitySuccess: createAction<any>(Types.MUNICIPALITY_SUCCESS),
  municipalityFailure: createAction<ErrorObject>(Types.MUNICIPALITY_FAILURE),

  getSector: createAction<any>(Types.GET_SECTOR),
  sectorLoading: createAction(Types.SECTOR_LOADING),
  sectorSuccess: createAction<any>(Types.SECTOR_SUCCESS),
  sectorFailure: createAction<ErrorObject>(Types.SECTOR_FAILURE),

  postRegister: createAction<any>(Types.POST_REGISTER),
  registerLoading: createAction(Types.REGISTER_LOADING),
  registerSuccess: createAction<any>(Types.REGISTER_SUCCESS),
  registerFailure: createAction<ErrorObject>(Types.REGISTER_FAILURE),

  signupCleanUp: createAction<ErrorObject>(Types.SIGNUP_CLEAN_UP),
}

export { Types };
export default Creators;