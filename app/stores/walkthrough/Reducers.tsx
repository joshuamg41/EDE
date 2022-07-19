import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { WalkthroughInitialState } from './InitialState';

const getLoading = (state: WalkthroughInitialState, action: ActionObject) => ({
  ...state,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: WalkthroughInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: WalkthroughInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: action.payload,
});

export const WalkthroughReducer = createReducer(INITIAL_STATE, {
  [Types.WALKTHROUGH_LOADING]: getLoading,
  [Types.WALKTHROUGH_SUCCESS]: getSuccess,
  [Types.WALKTHROUGH_FAILURE]: getFailure,
});