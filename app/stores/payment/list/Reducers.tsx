import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { PaymentListInitialState } from './InitialState';

const getLoading = (state: PaymentListInitialState, action: ActionObject) => ({
  ...state,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: PaymentListInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: PaymentListInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: action.payload,
});

export const PaymentListReducer = createReducer(INITIAL_STATE, {
  [Types.PAYMENT_LIST_LOADING]: getLoading,
  [Types.PAYMENT_LIST_SUCCESS]: getSuccess,
  [Types.PAYMENT_LIST_FAILURE]: getFailure,
});