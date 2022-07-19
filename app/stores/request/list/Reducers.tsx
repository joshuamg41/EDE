import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { RequestListInitialState } from './InitialState';

const getLoading = (state: RequestListInitialState, action: ActionObject) => ({
  ...state,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: RequestListInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: RequestListInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: action.payload,
});

const moreLoading = (state: RequestListInitialState, action: ActionObject) => ({
  ...state,
  moreLoading: true,
  moreError: INITIAL_STATE.moreError,
});

const moreSuccess = (state: RequestListInitialState, action: ActionObject) => ({
  ...state,
  moreData: action.payload,
  moreLoading: false,
  moreError: INITIAL_STATE.moreError,
});

const moreFailure = (state: RequestListInitialState, action: ActionObject) => ({
  ...state,
  moreData: INITIAL_STATE.moreData,
  moreLoading: false,
  moreError: action.payload,
});

const statisticLoading = (state: RequestListInitialState, action: ActionObject) => ({
  ...state,
  statisticLoading: true,
  statisticError: INITIAL_STATE.statisticError,
});

const statisticSuccess = (state: RequestListInitialState, action: ActionObject) => ({
  ...state,
  statisticData: action.payload,
  statisticLoading: false,
  statisticError: INITIAL_STATE.statisticError,
});

const statisticFailure = (state: RequestListInitialState, action: ActionObject) => ({
  ...state,
  statisticData: INITIAL_STATE.statisticData,
  statisticLoading: false,
  statisticError: action.payload,
});

export const RequestListReducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_LIST_LOADING]: getLoading,
  [Types.REQUEST_LIST_SUCCESS]: getSuccess,
  [Types.REQUEST_LIST_FAILURE]: getFailure,

  [Types.MORE_REQUEST_LOADING]: moreLoading,
  [Types.MORE_REQUEST_SUCCESS]: moreSuccess,
  [Types.MORE_REQUEST_FAILURE]: moreFailure,

  [Types.USER_STATISTIC_LOADING]: statisticLoading,
  [Types.USER_STATISTIC_SUCCESS]: statisticSuccess,
  [Types.USER_STATISTIC_FAILURE]: statisticFailure,
});
