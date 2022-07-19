import { call, put, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from '../../services/BaseApiConstants';
import { PaymentStatusRequest } from '../../services/payment/PaymentServiceConstants';
import RequestService from '../../services/request/RequestService';
import { RequestDetailResponse } from '../../services/request/RequestServiceConstants';
import ResponseCode from '../../services/ResponseCode';
import RequestDetailActions, { Types as RequestDetailTypes } from '../../stores/request/detail/Actions';
import { localToArray } from '../../utils/ArrayUtil';

function* getRequestDetail(request: any) {
  yield put(RequestDetailActions.requestDetailLoading());

  const response: ApiResponse<RequestDetailResponse> = yield call(RequestService.getSolicitudeDetail, request.payload);

  if (!response) {
    yield put(RequestDetailActions.requestDetailFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(RequestDetailActions.requestDetailFailure(response.problem));
    return
  }

  const result = {
    ...response.data,
    request: {
      ...response.data?.request,
      comments: localToArray(response.data?.request?.comments).reverse(),
    },
    requestPayload: request.payload,
  }

  yield put(RequestDetailActions.requestDetailSuccess(result));
}

export default [
  takeLatest(RequestDetailTypes.GET_REQUEST_DETAIL, getRequestDetail),
]