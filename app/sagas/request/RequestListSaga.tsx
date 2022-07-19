import { call, delay, put, race, select, take, takeLatest, takeLeading } from 'redux-saga/effects';
import { ApiResponse } from '../../services/BaseApiConstants';
import RequestService from '../../services/request/RequestService';
import { RequestListResponse } from '../../services/request/RequestServiceConstants';
import ResponseCode from '../../services/ResponseCode';
import { RootState } from '../../stores/AppReducers';
import RequestList, { Types as RequestListTypes } from '../../stores/request/list/Actions';

function* getRequestList(request: any) {
  yield put(RequestList.requestListLoading());

  const response: ApiResponse<RequestListResponse> = yield call(RequestService.getSolicitudeList, request.payload);

  if (!response || !response.data) {
    yield put(RequestList.requestListFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(RequestList.requestListFailure(response.problem));
    return
  }

  if(!Array.isArray(response.data.data)) {
    yield put(RequestList.requestListFailure(ResponseCode.SERVER_ERROR));
    return
  }

  const result = {
    ...response.data,
    data: response.data.data.map(item => {
      return {
        ...item,
        key: String(item.id),
      }
    })
  }

  yield put(RequestList.requestListSuccess(result));
}

function* getMoreRequest(request: any) {
  yield put(RequestList.moreRequestLoading());

  const response: ApiResponse<RequestListResponse> = yield call(RequestService.getSolicitudeList, request.payload);

  if (!response || !response.data) {
    yield delay(30000)
    yield put(RequestList.moreRequestFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield delay(30000)
    yield put(RequestList.moreRequestFailure(response.problem));
    return
  }

  const getData: RequestListResponse = yield select((state: RootState) => state.requestList.getData)

  const result = {
    ...response.data,
    data: [
      ...getData.data,
      ...response.data.data.map(item => {
        return {
          ...item,
          key: String(item.id),
        }
      })
    ]
  }
  yield put(RequestList.moreRequestSuccess({
    date: Number(new Date())
  }));
  yield put(RequestList.requestListSuccess(result));
}

function* getUserStatistic(request: any) {
  yield put(RequestList.userStatisticLoading());

  const response: ApiResponse<RequestListResponse> = yield call(RequestService.getStatisticUser, request.payload);

  if (!response || !response.data) {
    yield put(RequestList.userStatisticFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(RequestList.userStatisticFailure(response.problem));
    return
  }

  const result = {
    ...response.data,
  }

  yield put(RequestList.userStatisticSuccess(result));
}

export default [
  takeLatest(RequestListTypes.GET_REQUEST_LIST, getRequestList),
  takeLeading(RequestListTypes.GET_MORE_REQUEST, getMoreRequest),
  takeLeading(RequestListTypes.GET_USER_STATISTIC, getUserStatistic),
]