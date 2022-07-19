import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { PaymentSiriteInitialState } from './InitialState';

const updateLoading = (state: PaymentSiriteInitialState, action: ActionObject) => ({
  ...state,
  updateLoading: true,
  updateError: INITIAL_STATE.updateError,
});

const updateSuccess = (state: PaymentSiriteInitialState, action: ActionObject) => ({
  ...state,
  updateData: action.payload,
  updateLoading: false,
  updateError: INITIAL_STATE.updateError,
});

const updateFailure = (state: PaymentSiriteInitialState, action: ActionObject) => ({
  ...state,
  updateData: INITIAL_STATE.updateData,
  updateLoading: false,
  updateError: action.payload,
});

export const PaymentSiriteReducer = createReducer(INITIAL_STATE, {
  [Types.PAYMENT_INFO_LOADING]: updateLoading,
  [Types.PAYMENT_INFO_SUCCESS]: updateSuccess,
  [Types.PAYMENT_INFO_FAILURE]: updateFailure,
});
