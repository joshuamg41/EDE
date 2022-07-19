import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../../StoreConstants';

const Types = {
  GET_PROVINCE: 'GET_PROFILE_PROVINCE',
  PROVINCE_LOADING: 'PROFILE_PROVINCE_LOADING',
  PROVINCE_SUCCESS: 'PROFILE_PROVINCE_SUCCESS',
  PROVINCE_FAILURE: 'PROFILE_PROVINCE_FAILURE',

  GET_MUNICIPALITY: 'GET_PROFILE_MUNICIPALITY',
  MUNICIPALITY_LOADING: 'PROFILE_MUNICIPALITY_LOADING',
  MUNICIPALITY_SUCCESS: 'PROFILE_MUNICIPALITY_SUCCESS',
  MUNICIPALITY_FAILURE: 'PROFILE_MUNICIPALITY_FAILURE',

  GET_SECTOR: 'GET_PROFILE_SECTOR',
  SECTOR_LOADING: 'PROFILE_SECTOR_LOADING',
  SECTOR_SUCCESS: 'PROFILE_SECTOR_SUCCESS',
  SECTOR_FAILURE: 'PROFILE_SECTOR_FAILURE',

  SET_PROFILE_FIELDS: 'SET_PROFILE_FIELDS',

  POST_UPDATE_CITIZEN: 'POST_UPDATE_CITIZEN',
  UPDATE_CITIZEN_LOADING: 'UPDATE_CITIZEN_LOADING',
  UPDATE_CITIZEN_SUCCESS: 'UPDATE_CITIZEN_SUCCESS',
  UPDATE_CITIZEN_FAILURE: 'UPDATE_CITIZEN_FAILURE',

  DELETE_USER: 'DELETE_USER',
  DELETE_USER_LOADING: 'DELETE_USER_LOADING',
  DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
  DELETE_USER_FAILURE: 'DELETE_USER_FAILURE',
}

const Creators = {
  getProvince: createAction(Types.GET_PROVINCE),
  provinceLoading: createAction(Types.PROVINCE_LOADING),
  provinceSuccess: createAction<any>(Types.PROVINCE_SUCCESS),
  provinceFailure: createAction<ErrorObject>(Types.PROVINCE_FAILURE),

  getMunicipality: createAction<any>(Types.GET_MUNICIPALITY),
  municipalityLoading: createAction(Types.MUNICIPALITY_LOADING),
  municipalitySuccess: createAction<any>(Types.MUNICIPALITY_SUCCESS),
  municipalityFailure: createAction<ErrorObject>(Types.MUNICIPALITY_FAILURE),

  getSector: createAction<any>(Types.GET_SECTOR),
  sectorLoading: createAction(Types.SECTOR_LOADING),
  sectorSuccess: createAction<any>(Types.SECTOR_SUCCESS),
  sectorFailure: createAction<ErrorObject>(Types.SECTOR_FAILURE),

  setProfileFields: createAction(Types.SET_PROFILE_FIELDS),

  postUpdateCitizen: createAction<any>(Types.POST_UPDATE_CITIZEN),
  updateCitizenLoading: createAction(Types.UPDATE_CITIZEN_LOADING),
  updateCitizenSuccess: createAction<any>(Types.UPDATE_CITIZEN_SUCCESS),
  updateCitizenFailure: createAction<ErrorObject>(Types.UPDATE_CITIZEN_FAILURE),

  deleteUser: createAction<any>(Types.DELETE_USER),
  deleteUserLoading: createAction(Types.DELETE_USER_LOADING),
  deleteUserSuccess: createAction<any>(Types.DELETE_USER_SUCCESS),
  deleteUserFailure: createAction<ErrorObject>(Types.DELETE_USER_FAILURE),
}

export { Types };
export default Creators;