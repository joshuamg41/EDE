import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../../StoreConstants';

const Types = {
  GET_PAYMENT_DETAIL: 'GET_PAYMENT_DETAIL',
  PAYMENT_DETAIL_LOADING: 'PAYMENT_DETAIL_LOADING',
  PAYMENT_DETAIL_SUCCESS: 'PAYMENT_DETAIL_SUCCESS',
  PAYMENT_DETAIL_FAILURE: 'PAYMENT_DETAIL_FAILURE',
}

const Creators = {
  getPaymentDetail: createAction<any>(Types.GET_PAYMENT_DETAIL),
  paymentDetailLoading: createAction(Types.PAYMENT_DETAIL_LOADING),
  paymentDetailSuccess: createAction<any>(Types.PAYMENT_DETAIL_SUCCESS),
  paymentDetailFailure: createAction<ErrorObject>(Types.PAYMENT_DETAIL_FAILURE),
}

export { Types };
export default Creators;