import { call, put, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from '../services/BaseApiConstants';
import ExampleService from '../services/example/ExampleService';
import { ExampleResponse } from '../services/example/ExampleServiceConstants';
import ResponseCode from '../services/ResponseCode';
import ExampleActions, { Types as ExampleTypes } from '../stores/example/Actions';
import { isEmpty } from '../utils/ValidationUtil';

function* exampleFunction(request: any) {
  yield put(ExampleActions.exampleLoading());

  const response: ApiResponse<ExampleResponse> = yield call(ExampleService.getHistory, request.payload);

  if (!response) {
    yield put(ExampleActions.exampleFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(ExampleActions.exampleFailure(response.problem));
    return
  }

  if (isEmpty(response)) {
    yield put(ExampleActions.exampleSuccess([]));
    return
  }

  const result = {
    ...response
  }

  yield put(ExampleActions.exampleSuccess(result));
}

export default [
  takeLatest(ExampleTypes.EXAMPLE_PAYLOAD, exampleFunction),
  //  takeLatest(ExampleTypes.EXAMPLE_PAYLOAD, exampleMultiCalling),
]