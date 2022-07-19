import { call, put, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from '../../services/BaseApiConstants';
import PaymentFormService from '../../services/payment/PaymentService';
import { PaymentStatusRequest } from '../../services/payment/PaymentServiceConstants';
import ResponseCode from '../../services/ResponseCode';
import PaymentFormActions, { Types as PaymentFormTypes } from '../../stores/Payment/form/Actions';

function* getPaymentStatus(request: any) {
  yield put(PaymentFormActions.paymentStatusLoading());

  const response: ApiResponse<PaymentStatusRequest> = yield call(PaymentFormService.getPaymentStatus, request.payload);

  if (!response) {
    yield put(PaymentFormActions.paymentStatusFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(PaymentFormActions.paymentStatusFailure(response.problem));
    return
  }

  const result = {

  }

  yield put(PaymentFormActions.paymentStatusSuccess(result));
}

export default [
  takeLatest(PaymentFormTypes.GET_PAYMENT_STATUS, getPaymentStatus),
]