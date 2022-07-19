import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { RatingListInitialState } from './InitialState';

const getLoading = (state: RatingListInitialState, action: ActionObject) => ({
  ...state,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: RatingListInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: RatingListInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: action.payload,
});

const moreLoading = (state: RatingListInitialState, action: ActionObject) => ({
  ...state,
  moreLoading: true,
  moreError: INITIAL_STATE.moreError,
});

const moreSuccess = (state: RatingListInitialState, action: ActionObject) => ({
  ...state,
  moreData: action.payload,
  moreLoading: false,
  moreError: INITIAL_STATE.moreError,
});

const moreFailure = (state: RatingListInitialState, action: ActionObject) => ({
  ...state,
  moreData: INITIAL_STATE.moreData,
  moreLoading: false,
  moreError: action.payload,
});

export const RatingListReducer = createReducer(INITIAL_STATE, {
  [Types.RATING_LIST_LOADING]: getLoading,
  [Types.RATING_LIST_SUCCESS]: getSuccess,
  [Types.RATING_LIST_FAILURE]: getFailure,

  [Types.MORE_RATING_LOADING]: moreLoading,
  [Types.MORE_RATING_SUCCESS]: moreSuccess,
  [Types.MORE_RATING_FAILURE]: moreFailure,
});
