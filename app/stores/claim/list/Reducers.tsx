import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { ClaimListInitialState } from './InitialState';

const getLoading = (state: ClaimListInitialState, action: ActionObject) => ({
  ...state,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: ClaimListInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: ClaimListInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: action.payload,
});

export const ClaimListReducer = createReducer(INITIAL_STATE, {
  [Types.CLAIM_LIST_LOADING]: getLoading,
  [Types.CLAIM_LIST_SUCCESS]: getSuccess,
  [Types.CLAIM_LIST_FAILURE]: getFailure,
});