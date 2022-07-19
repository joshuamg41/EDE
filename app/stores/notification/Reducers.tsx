import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { NotificationInitialState } from './InitialState';

const getLoading = (state: NotificationInitialState, action: ActionObject) => ({
  ...state,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: NotificationInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: NotificationInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: action.payload,
});

const postLoading = (state: NotificationInitialState, action: ActionObject) => ({
  ...state,
  postLoading: true,
  postError: INITIAL_STATE.postError,
});

const postSuccess = (state: NotificationInitialState, action: ActionObject) => ({
  ...state,
  postData: action.payload,
  postLoading: false,
  postError: INITIAL_STATE.postError,
});

const postFailure = (state: NotificationInitialState, action: ActionObject) => ({
  ...state,
  postData: INITIAL_STATE.postData,
  postLoading: false,
  postError: action.payload,
});

export const NotificationReducer = createReducer(INITIAL_STATE, {
  [Types.NOTIFICATION_LOADING]: getLoading,
  [Types.NOTIFICATION_SUCCESS]: getSuccess,
  [Types.NOTIFICATION_FAILURE]: getFailure,

  [Types.NOTIFICATION_READ_LOADING]: postLoading,
  [Types.NOTIFICATION_READ_SUCCESS]: postSuccess,
  [Types.NOTIFICATION_READ_FAILURE]: postFailure,
});
