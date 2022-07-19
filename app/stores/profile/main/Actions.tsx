import { createAction } from '@reduxjs/toolkit';
import { AddCompanyRequest } from '../../../services/profile/ProfileServiceConstants';
import { ErrorObject } from '../../StoreConstants';

const Types = {
  GET_PROFILE_MAIN: 'GET_PROFILE_MAIN',
  PROFILE_MAIN_LOADING: 'PROFILE_MAIN_LOADING',
  PROFILE_MAIN_SUCCESS: 'PROFILE_MAIN_SUCCESS',
  PROFILE_MAIN_FAILURE: 'PROFILE_MAIN_FAILURE',

  POST_NEW_PASSWORD: 'POST_NEW_PASSWORD',
  NEW_PASSWORD_LOADING: 'NEW_PASSWORD_LOADING',
  NEW_PASSWORD_SUCCESS: 'NEW_PASSWORD_SUCCESS',
  NEW_PASSWORD_FAILURE: 'NEW_PASSWORD_FAILURE',

  POST_NEW_EMAIL: 'POST_NEW_EMAIL',
  NEW_EMAIL_LOADING: 'NEW_EMAIL_LOADING',
  NEW_EMAIL_SUCCESS: 'NEW_EMAIL_SUCCESS',
  NEW_EMAIL_FAILURE: 'NEW_EMAIL_FAILURE',

  POST_NEW_COMPANY: 'POST_NEW_COMPANY',
  NEW_COMPANY_LOADING: 'NEW_COMPANY_LOADING',
  NEW_COMPANY_SUCCESS: 'NEW_COMPANY_SUCCESS',
  NEW_COMPANY_FAILURE: 'NEW_COMPANY_FAILURE',
}

const Creators = {
  getProfileMain: createAction(Types.GET_PROFILE_MAIN),
  profileMainLoading: createAction(Types.PROFILE_MAIN_LOADING),
  profileMainSuccess: createAction<any>(Types.PROFILE_MAIN_SUCCESS),
  profileMainFailure: createAction<ErrorObject>(Types.PROFILE_MAIN_FAILURE),

  postNewPassword: createAction<any>(Types.POST_NEW_PASSWORD),
  newPasswordLoading: createAction(Types.NEW_PASSWORD_LOADING),
  newPasswordSuccess: createAction<any>(Types.NEW_PASSWORD_SUCCESS),
  newPasswordFailure: createAction<ErrorObject>(Types.NEW_PASSWORD_FAILURE),

  postNewEmail: createAction<any>(Types.POST_NEW_EMAIL),
  newEmailLoading: createAction(Types.NEW_EMAIL_LOADING),
  newEmailSuccess: createAction<any>(Types.NEW_EMAIL_SUCCESS),
  newEmailFailure: createAction<ErrorObject>(Types.NEW_EMAIL_FAILURE),
  
  postNewCompany: createAction<AddCompanyRequest>(Types.POST_NEW_COMPANY),
  newCompanyLoading: createAction(Types.NEW_COMPANY_LOADING),
  newCompanySuccess: createAction<any>(Types.NEW_COMPANY_SUCCESS),
  newCompanyFailure: createAction<ErrorObject>(Types.NEW_COMPANY_FAILURE),
}

export { Types };
export default Creators;