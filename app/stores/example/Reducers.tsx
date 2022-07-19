import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { ExampleInitialState } from './InitialState';

const getLoading = (state: ExampleInitialState, action: ActionObject) => ({
  ...state,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: ExampleInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: ExampleInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: action.payload,
});

export const ExampleReducer = createReducer(INITIAL_STATE, {
  [Types.EXAMPLE_LOADING]: getLoading,
  [Types.EXAMPLE_SUCCESS]: getSuccess,
  [Types.EXAMPLE_FAILURE]: getFailure,
});
