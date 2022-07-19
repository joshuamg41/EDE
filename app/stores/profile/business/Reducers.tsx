import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { ProfileBusinessInitialState } from './InitialState';

const updateBusinessLoading = (state: ProfileBusinessInitialState, action: ActionObject) => ({
  ...state,
  updateLoading: true,
  updateError: INITIAL_STATE.updateError,
});

const updateBusinessSuccess = (state: ProfileBusinessInitialState, action: ActionObject) => ({
  ...state,
  updateData: action.payload,
  updateLoading: false,
  updateError: INITIAL_STATE.updateError,
});

const updateBusinessFailure = (state: ProfileBusinessInitialState, action: ActionObject) => ({
  ...state,
  updateData: INITIAL_STATE.updateData,
  updateLoading: false,
  updateError: action.payload,
});


export const ProfileBusinessReducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_BUSINESS_LOADING]: updateBusinessLoading,
  [Types.UPDATE_BUSINESS_SUCCESS]: updateBusinessSuccess,
  [Types.UPDATE_BUSINESS_FAILURE]: updateBusinessFailure,
});
