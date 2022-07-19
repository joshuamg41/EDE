import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { DraftListInitialState } from './InitialState';

const getLoading = (state: DraftListInitialState, action: ActionObject) => ({
  ...state,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: DraftListInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: DraftListInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: action.payload,
});

export const DraftListReducer = createReducer(INITIAL_STATE, {
  [Types.DRAFT_LIST_LOADING]: getLoading,
  [Types.DRAFT_LIST_SUCCESS]: getSuccess,
  [Types.DRAFT_LIST_FAILURE]: getFailure,
});