import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from '../services/BaseApiConstants';
import WalkthroughService from '../services/walkthrough/WalkthroughService';
import { WalkthroughResponse } from '../services/walkthrough/WalkthroughServiceConstants';
import ResponseCode from '../services/ResponseCode';
import WalkthroughActions, { Types as WalkthroughTypes } from '../stores/walkthrough/Actions';
import { navigateAndReset } from '../services/NavigationService';

function* getWalkthrough(request: any) {
  yield put(WalkthroughActions.walkthroughLoading());

  const response: ApiResponse<WalkthroughResponse[]> = yield call(WalkthroughService.getWalkthroughContent, request.payload);

  if (!response || response.problem) {
    yield put(WalkthroughActions.walkthroughFailure(ResponseCode.BAD_REQUEST));
    yield fork(navigateAndReset, 'Welcome')
    return
  }

  const result = response.data?.[0]

  yield fork(navigateAndReset, 'Walkthrough')
  yield put(WalkthroughActions.walkthroughSuccess(result));
}

export default [
  takeLatest(WalkthroughTypes.GET_WALKTHROUGH, getWalkthrough),
]