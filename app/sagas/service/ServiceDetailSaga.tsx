import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from '../../services/BaseApiConstants';
import ServiceService from '../../services/service/ServiceService';
import { ServiceDetailResponse } from '../../services/service/ServiceServiceConstants';
import ResponseCode from '../../services/ResponseCode';
import ServiceDetailActions, { Types as ServiceDetailTypes } from '../../stores/service/detail/Actions';
import { navigate } from '../../services/NavigationService';

function* getServiceDetail(request: any) {
  yield put(ServiceDetailActions.serviceDetailLoading(request.payload?.navigate || true));

  const response: ApiResponse<ServiceDetailResponse> = yield call(ServiceService.getServiceDetail, request.payload);

  if (!response) {
    yield put(ServiceDetailActions.serviceDetailFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(ServiceDetailActions.serviceDetailFailure(response.problem));
    return
  }

  const result = {
    ...response.data,
    prices: response.data?.prices.map(price => ({
      ...price,
      key: String(price.id),
      variations: price.variations.map(variation => ({
        ...variation,
        key: String(variation.id),
        label: variation.description,
        value: String(variation.id),
      }))
    })
    ),
    navigate: request.payload?.navigate,
  }

  if (request.payload?.navigate) {
    navigate(request.payload?.navigate, { draft: true })
  }
  yield put(ServiceDetailActions.serviceDetailSuccess(result));
}

export default [
  takeLatest(ServiceDetailTypes.GET_SERVICE_DETAIL, getServiceDetail),
]