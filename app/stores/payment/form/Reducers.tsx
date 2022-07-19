import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { PaymentFormInitialState } from './InitialState';

const payLoading = (state: PaymentFormInitialState, action: ActionObject) => ({
  ...state,
  payLoading: true,
  payError: INITIAL_STATE.payError,
});

const paySuccess = (state: PaymentFormInitialState, action: ActionObject) => ({
  ...state,
  payData: action.payload,
  payLoading: false,
  payError: INITIAL_STATE.payError,
});

const payFailure = (state: PaymentFormInitialState, action: ActionObject) => ({
  ...state,
  payData: INITIAL_STATE.payData,
  payLoading: false,
  payError: action.payload,
});

const postLoading = (state: PaymentFormInitialState, action: ActionObject) => ({
  ...state,
  postLoading: true,
  postError: INITIAL_STATE.postError,
});

const postSuccess = (state: PaymentFormInitialState, action: ActionObject) => ({
  ...state,
  postData: action.payload,
  postLoading: false,
  postError: INITIAL_STATE.postError,
});

const postFailure = (state: PaymentFormInitialState, action: ActionObject) => ({
  ...state,
  postData: INITIAL_STATE.postData,
  postLoading: false,
  postError: action.payload,
});

export const PaymentFormReducer = createReducer(INITIAL_STATE, {
  [Types.PAYMENT_STATUS_LOADING]: payLoading,
  [Types.PAYMENT_STATUS_SUCCESS]: paySuccess,
  [Types.PAYMENT_STATUS_FAILURE]: payFailure,

  [Types.PAYMENT_FORM_LOADING]: postLoading,
  [Types.PAYMENT_FORM_SUCCESS]: postSuccess,
  [Types.PAYMENT_FORM_FAILURE]: postFailure,
});
