import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { ServiceSolicitudeInitialState } from './InitialState';

const getLoading = (state: ServiceSolicitudeInitialState, action: ActionObject) => ({
  ...state,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: ServiceSolicitudeInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: ServiceSolicitudeInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: action.payload,
});

const postLoading = (state: ServiceSolicitudeInitialState, action: ActionObject) => ({
  ...state,
  postLoading: true,
  postError: INITIAL_STATE.postError,
});

const postSuccess = (state: ServiceSolicitudeInitialState, action: ActionObject) => ({
  ...state,
  postData: action.payload,
  postLoading: false,
  postError: INITIAL_STATE.postError,
});

const postFailure = (state: ServiceSolicitudeInitialState, action: ActionObject) => ({
  ...state,
  postData: INITIAL_STATE.postData,
  postLoading: false,
  postError: action.payload,
});

const saveLoading = (state: ServiceSolicitudeInitialState, action: ActionObject) => ({
  ...state,
  saveLoading: true,
  saveError: INITIAL_STATE.saveError,
});

const saveSuccess = (state: ServiceSolicitudeInitialState, action: ActionObject) => ({
  ...state,
  saveData: action.payload,
  saveLoading: false,
  saveError: INITIAL_STATE.saveError,
});

const saveFailure = (state: ServiceSolicitudeInitialState, action: ActionObject) => ({
  ...state,
  saveData: INITIAL_STATE.saveData,
  saveLoading: false,
  saveError: action.payload,
});

const mimarenaLoading = (state: ServiceSolicitudeInitialState, action: ActionObject) => ({
  ...state,
  mimarenaData: INITIAL_STATE.mimarenaData,
  mimarenaLoading: action.payload,
  mimarenaError: INITIAL_STATE.mimarenaError,
});

const mimarenaSuccess = (state: ServiceSolicitudeInitialState, action: ActionObject) => ({
  ...state,
  mimarenaData: action.payload,
  mimarenaLoading: INITIAL_STATE.mimarenaLoading,
  mimarenaError: INITIAL_STATE.mimarenaError,
});

const mimarenaFailure = (state: ServiceSolicitudeInitialState, action: ActionObject) => ({
  ...state,
  mimarenaData: INITIAL_STATE.mimarenaData,
  mimarenaLoading: INITIAL_STATE.mimarenaLoading,
  mimarenaError: action.payload,
});

const dppLoading = (state: ServiceSolicitudeInitialState, action: ActionObject) => ({
  ...state,
  dppData: INITIAL_STATE.dppData,
  dppLoading: action.payload,
  dppError: INITIAL_STATE.dppError,
});

const dppSuccess = (state: ServiceSolicitudeInitialState, action: ActionObject) => ({
  ...state,
  dppData: action.payload,
  dppLoading: INITIAL_STATE.dppLoading,
  dppError: INITIAL_STATE.dppError,
});

const dppFailure = (state: ServiceSolicitudeInitialState, action: ActionObject) => ({
  ...state,
  dppData: INITIAL_STATE.dppData,
  dppLoading: INITIAL_STATE.dppLoading,
  dppError: action.payload,
});

export const ServiceSolicitudeReducer = createReducer(INITIAL_STATE, {
  [Types.SERVICE_SOLICITUDE_LOADING]: getLoading,
  [Types.SERVICE_SOLICITUDE_SUCCESS]: getSuccess,
  [Types.SERVICE_SOLICITUDE_FAILURE]: getFailure,

  [Types.POST_SERVICE_SOLICITUDE_LOADING]: postLoading,
  [Types.POST_SERVICE_SOLICITUDE_SUCCESS]: postSuccess,
  [Types.POST_SERVICE_SOLICITUDE_FAILURE]: postFailure,

  [Types.SAVE_SERVICE_SOLICITUDE_LOADING]: saveLoading,
  [Types.SAVE_SERVICE_SOLICITUDE_SUCCESS]: saveSuccess,
  [Types.SAVE_SERVICE_SOLICITUDE_FAILURE]: saveFailure,

  [Types.MIMARENA_VALIDATE_LOADING]: mimarenaLoading,
  [Types.MIMARENA_VALIDATE_SUCCESS]: mimarenaSuccess,
  [Types.MIMARENA_VALIDATE_FAILURE]: mimarenaFailure,

  [Types.DPP_VALIDATE_LOADING]: dppLoading,
  [Types.DPP_VALIDATE_SUCCESS]: dppSuccess,
  [Types.DPP_VALIDATE_FAILURE]: dppFailure,
});