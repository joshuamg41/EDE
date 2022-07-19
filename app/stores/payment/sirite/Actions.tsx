import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../../StoreConstants';

const Types = {
  UPDATE_PAYMENT_INFO: 'POST_PAYMENT_INFO',
  PAYMENT_INFO_LOADING: 'PAYMENT_INFO_LOADING',
  PAYMENT_INFO_SUCCESS: 'PAYMENT_INFO_SUCCESS',
  PAYMENT_INFO_FAILURE: 'PAYMENT_INFO_FAILURE',
}

const Creators = {
  updatePaymentInfo: createAction<any>(Types.UPDATE_PAYMENT_INFO),
  paymentInfoLoading: createAction(Types.PAYMENT_INFO_LOADING),
  paymentInfoSuccess: createAction<any>(Types.PAYMENT_INFO_SUCCESS),
  paymentInfoFailure: createAction<ErrorObject>(Types.PAYMENT_INFO_FAILURE),
}

export { Types };
export default Creators;