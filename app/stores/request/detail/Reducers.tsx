import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { RequestDetailInitialState } from './InitialState';

const getLoading = (state: RequestDetailInitialState, action: ActionObject) => ({
  ...state,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: RequestDetailInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: RequestDetailInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: action.payload,
});

export const RequestDetailReducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_DETAIL_LOADING]: getLoading,
  [Types.REQUEST_DETAIL_SUCCESS]: getSuccess,
  [Types.REQUEST_DETAIL_FAILURE]: getFailure,
});