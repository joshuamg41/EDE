import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { PaymentDetailInitialState } from './InitialState';

const getLoading = (state: PaymentDetailInitialState, action: ActionObject) => ({
  ...state,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: PaymentDetailInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: PaymentDetailInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: action.payload,
});

export const PaymentDetailReducer = createReducer(INITIAL_STATE, {
  [Types.PAYMENT_DETAIL_LOADING]: getLoading,
  [Types.PAYMENT_DETAIL_SUCCESS]: getSuccess,
  [Types.PAYMENT_DETAIL_FAILURE]: getFailure,
});
