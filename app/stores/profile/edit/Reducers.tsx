import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { ProfileInitialState } from './InitialState';

const provinceLoading = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  provinceLoading: true,
  provinceError: INITIAL_STATE.provinceError,
});

const provinceSuccess = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  provinceData: action.payload,
  provinceLoading: false,
  provinceError: INITIAL_STATE.provinceError,
});

const provinceFailure = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  provinceData: INITIAL_STATE.provinceData,
  provinceLoading: false,
  provinceError: action.payload,
});

const municipalityLoading = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  municipalityLoading: true,
  municipalityError: INITIAL_STATE.municipalityError,
});

const municipalitySuccess = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  municipalityData: action.payload,
  municipalityLoading: false,
  municipalityError: INITIAL_STATE.municipalityError,
});

const municipalityFailure = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  municipalityData: INITIAL_STATE.municipalityData,
  municipalityLoading: false,
  municipalityError: action.payload,
});

const sectorLoading = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  sectorLoading: true,
  sectorError: INITIAL_STATE.sectorError,
});

const sectorSuccess = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  sectorLoading: false,
  sectorData: action.payload,
  sectorError: INITIAL_STATE.sectorError,
});

const sectorFailure = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  sectorLoading: false,
  sectorData: INITIAL_STATE.sectorData,
  sectorError: action.payload,
});

const updateCitizenLoading = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  updateCitizenLoading: true,
  updateCitizenError: INITIAL_STATE.updateCitizenError,
});

const updateCitizenSuccess = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  updateCitizenData: action.payload,
  updateCitizenLoading: false,
  updateCitizenError: INITIAL_STATE.updateCitizenError,
});

const updateCitizenFailure = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  updateCitizenData: INITIAL_STATE.updateCitizenData,
  updateCitizenLoading: false,
  updateCitizenError: action.payload,
});

const deleteLoading = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  deleteLoading: true,
  deleteError: INITIAL_STATE.deleteError,
});

const deleteSuccess = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  deleteData: action.payload,
  deleteLoading: false,
  deleteError: INITIAL_STATE.deleteError,
});

const deleteFailure = (state: ProfileInitialState, action: ActionObject) => ({
  ...state,
  deleteData: INITIAL_STATE.deleteData,
  deleteLoading: false,
  deleteError: action.payload,
});

export const ProfileEditReducer = createReducer(INITIAL_STATE, {
  [Types.PROVINCE_LOADING]: provinceLoading,
  [Types.PROVINCE_SUCCESS]: provinceSuccess,
  [Types.PROVINCE_FAILURE]: provinceFailure,

  [Types.MUNICIPALITY_LOADING]: municipalityLoading,
  [Types.MUNICIPALITY_SUCCESS]: municipalitySuccess,
  [Types.MUNICIPALITY_FAILURE]: municipalityFailure,

  [Types.SECTOR_LOADING]: sectorLoading,
  [Types.SECTOR_SUCCESS]: sectorSuccess,
  [Types.SECTOR_FAILURE]: sectorFailure,

  [Types.UPDATE_CITIZEN_LOADING]: updateCitizenLoading,
  [Types.UPDATE_CITIZEN_SUCCESS]: updateCitizenSuccess,
  [Types.UPDATE_CITIZEN_FAILURE]: updateCitizenFailure,
  
  [Types.DELETE_USER_LOADING]: deleteLoading,
  [Types.DELETE_USER_SUCCESS]: deleteSuccess,
  [Types.DELETE_USER_FAILURE]: deleteFailure,
});
