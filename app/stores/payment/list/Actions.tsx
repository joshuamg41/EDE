import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../../StoreConstants';

const Types = {
  GET_PAYMENT_LIST: 'GET_PAYMENT_LIST',
  PAYMENT_LIST_LOADING: 'PAYMENT_LIST_LOADING',
  PAYMENT_LIST_SUCCESS: 'PAYMENT_LIST_SUCCESS',
  PAYMENT_LIST_FAILURE: 'PAYMENT_LIST_FAILURE',
}

const Creators = {
  getClaimList: createAction<any>(Types.GET_PAYMENT_LIST),
  paymentListLoading: createAction(Types.PAYMENT_LIST_LOADING),
  paymentListSuccess: createAction<any>(Types.PAYMENT_LIST_SUCCESS),
  paymentListFailure: createAction<ErrorObject>(Types.PAYMENT_LIST_FAILURE),
}

export { Types };
export default Creators;