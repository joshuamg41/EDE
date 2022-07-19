import { call, put, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from '../../services/BaseApiConstants';
import ServiceService from '../../services/service/ServiceService';
import { ServiceListResponse } from '../../services/service/ServiceServiceConstants';
import ResponseCode from '../../services/ResponseCode';
import ServiceListActions, { Types as ServiceListTypes } from '../../stores/service/list/Actions';

function* getServiceList(request: any) {
  yield put(ServiceListActions.serviceListLoading());

  const response: ApiResponse<ServiceListResponse[]> = yield call(ServiceService.getServiceList, request.payload);

  if (!response || !response.data) {
    yield put(ServiceListActions.serviceListFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(ServiceListActions.serviceListFailure(response.problem));
    return
  }

  const result = response.data.map(direction => {
    return {
      ...direction,
      services: direction?.services?.
        map(service => ({
          ...service,
          key: String(service.id),
        })).
        filter(service => service?.app_movil)
    }
  })

  yield put(ServiceListActions.serviceListSuccess(result));
}

export default [
  takeLatest(ServiceListTypes.GET_SERVICE_LIST, getServiceList),
]