import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { ClaimSolicitudeInitialState } from './InitialState';

const getLoading = (state: ClaimSolicitudeInitialState, action: ActionObject) => ({
  ...state,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: ClaimSolicitudeInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: ClaimSolicitudeInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: action.payload,
});

const postLoading = (state: ClaimSolicitudeInitialState, action: ActionObject) => ({
  ...state,
  postLoading: true,
  postError: INITIAL_STATE.postError,
});

const postSuccess = (state: ClaimSolicitudeInitialState, action: ActionObject) => ({
  ...state,
  postData: action.payload,
  postLoading: false,
  postError: INITIAL_STATE.postError,
});

const postFailure = (state: ClaimSolicitudeInitialState, action: ActionObject) => ({
  ...state,
  postData: INITIAL_STATE.postData,
  postLoading: false,
  postError: action.payload,
});

export const ClaimSolicitudeReducer = createReducer(INITIAL_STATE, {
  [Types.CLAIM_SOLICITUDE_LOADING]: getLoading,
  [Types.CLAIM_SOLICITUDE_SUCCESS]: getSuccess,
  [Types.CLAIM_SOLICITUDE_FAILURE]: getFailure,

  [Types.POST_CLAIM_SOLICITUDE_LOADING]: postLoading,
  [Types.POST_CLAIM_SOLICITUDE_SUCCESS]: postSuccess,
  [Types.POST_CLAIM_SOLICITUDE_FAILURE]: postFailure,
});
