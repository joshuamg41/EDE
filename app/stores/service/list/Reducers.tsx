import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { ServiceListInitialState } from './InitialState';

const getLoading = (state: ServiceListInitialState, action: ActionObject) => ({
  ...state,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: ServiceListInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: ServiceListInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: action.payload,
});

const setQuery = (state: ServiceListInitialState, action: ActionObject) => ({
  ...state,
  query: action.payload,
});

export const ServiceListReducer = createReducer(INITIAL_STATE, {
  [Types.SERVICE_LIST_LOADING]: getLoading,
  [Types.SERVICE_LIST_SUCCESS]: getSuccess,
  [Types.SERVICE_LIST_FAILURE]: getFailure,

  [Types.SET_QUERY]: setQuery,
});
