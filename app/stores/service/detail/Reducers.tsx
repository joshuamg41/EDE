import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { ServiceDetailInitialState } from './InitialState';

const getLoading = (state: ServiceDetailInitialState, action: ActionObject) => ({
  ...state,
  getLoading: action.payload,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: ServiceDetailInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: ServiceDetailInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: action.payload,
});

const setServicePrice = (state: ServiceDetailInitialState, action: ActionObject) => ({
  ...state,
  servicePrice: action.payload,
});

export const ServiceDetailReducer = createReducer(INITIAL_STATE, {
  [Types.SERVICE_DETAIL_LOADING]: getLoading,
  [Types.SERVICE_DETAIL_SUCCESS]: getSuccess,
  [Types.SERVICE_DETAIL_FAILURE]: getFailure,

  [Types.SET_SERVICE_PRICE]: setServicePrice,
});
