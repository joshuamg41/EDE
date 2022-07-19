import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { RequestResolveInitialState } from './InitialState';

const postLoading = (state: RequestResolveInitialState, action: ActionObject) => ({
  ...state,
  postLoading: true,
  postError: INITIAL_STATE.postError,
});

const postSuccess = (state: RequestResolveInitialState, action: ActionObject) => ({
  ...state,
  postData: action.payload,
  postLoading: false,
  postError: INITIAL_STATE.postError,
});

const postFailure = (state: RequestResolveInitialState, action: ActionObject) => ({
  ...state,
  postData: INITIAL_STATE.postData,
  postLoading: false,
  postError: action.payload,
});

export const RequestResolveReducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_RESOLVE_LOADING]: postLoading,
  [Types.REQUEST_RESOLVE_SUCCESS]: postSuccess,
  [Types.REQUEST_RESOLVE_FAILURE]: postFailure,
});