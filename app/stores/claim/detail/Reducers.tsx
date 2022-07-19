import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { ClaimDetailInitialState } from './InitialState';

const getLoading = (state: ClaimDetailInitialState, action: ActionObject) => ({
  ...state,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: ClaimDetailInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: ClaimDetailInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: action.payload,
});

export const ClaimDetailReducer = createReducer(INITIAL_STATE, {
  [Types.CLAIM_DETAIL_LOADING]: getLoading,
  [Types.CLAIM_DETAIL_SUCCESS]: getSuccess,
  [Types.CLAIM_DETAIL_FAILURE]: getFailure,
});
