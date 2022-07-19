import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../../StoreConstants';

const Types = {
  GET_PAYMENT_STATUS: 'GET_PAYMENT_STATUS',
  PAYMENT_STATUS_LOADING: 'PAYMENT_STATUS_LOADING',
  PAYMENT_STATUS_SUCCESS: 'PAYMENT_STATUS_SUCCESS',
  PAYMENT_STATUS_FAILURE: 'PAYMENT_STATUS_FAILURE',

  POST_PAYMENT_FORM: 'POST_PAYMENT_FORM',
  PAYMENT_FORM_LOADING: 'PAYMENT_FORM_LOADING',
  PAYMENT_FORM_SUCCESS: 'PAYMENT_FORM_SUCCESS',
  PAYMENT_FORM_FAILURE: 'PAYMENT_FORM_FAILURE',
}

const Creators = {
  getPaymentStatus: createAction<any>(Types.GET_PAYMENT_STATUS),
  paymentStatusLoading: createAction(Types.PAYMENT_STATUS_LOADING),
  paymentStatusSuccess: createAction<any>(Types.PAYMENT_STATUS_SUCCESS),
  paymentStatusFailure: createAction<ErrorObject>(Types.PAYMENT_STATUS_FAILURE),

  postPaymentForm: createAction<any>(Types.POST_PAYMENT_FORM),
  paymentFormLoading: createAction(Types.PAYMENT_FORM_LOADING),
  paymentFormSuccess: createAction<any>(Types.PAYMENT_FORM_SUCCESS),
  paymentFormFailure: createAction<ErrorObject>(Types.PAYMENT_FORM_FAILURE),
}

export { Types };
export default Creators;