import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { RatingSolicitudeInitialState } from './InitialState';

const postLoading = (state: RatingSolicitudeInitialState, action: ActionObject) => ({
  ...state,
  postLoading: true,
  postError: INITIAL_STATE.postError,
});

const postSuccess = (state: RatingSolicitudeInitialState, action: ActionObject) => ({
  ...state,
  postData: action.payload,
  postLoading: false,
  postError: INITIAL_STATE.postError,
});

const postFailure = (state: RatingSolicitudeInitialState, action: ActionObject) => ({
  ...state,
  postData: INITIAL_STATE.postData,
  postLoading: false,
  postError: action.payload,
});

export const RatingSolicitudeReducer = createReducer(INITIAL_STATE, {
  [Types.POST_RATING_LOADING]: postLoading,
  [Types.POST_RATING_SUCCESS]: postSuccess,
  [Types.POST_RATING_FAILURE]: postFailure,
});
