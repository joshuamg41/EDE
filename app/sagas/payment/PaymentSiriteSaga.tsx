import { call, put, takeLatest, takeLeading } from 'redux-saga/effects';
import { ApiResponse } from '../../services/BaseApiConstants';
import PaymentService from '../../services/payment/PaymentService';
import { PaymentStatusRequest } from '../../services/payment/PaymentServiceConstants';
import ResponseCode from '../../services/ResponseCode';
import PaymentSiriteActions, { Types as PaymentSiriteTypes } from '../../stores/payment/sirite/Actions';

function* updatePaymentInfo(request: any) {
  yield put(PaymentSiriteActions.paymentInfoLoading());

  const response: ApiResponse<PaymentStatusRequest> = yield call(PaymentService.postPaymentUpdate, request.payload);

  if (!response) {
    yield put(PaymentSiriteActions.paymentInfoFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(PaymentSiriteActions.paymentInfoFailure(response.problem));
    return
  }

  const result = {

  }

  yield put(PaymentSiriteActions.paymentInfoSuccess(result));
}

export default [
  takeLeading(PaymentSiriteTypes.UPDATE_PAYMENT_INFO, updatePaymentInfo),
]