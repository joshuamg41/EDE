import { call, put, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from '../../services/BaseApiConstants';
import ClaimService from '../../services/claim/ClaimService';
import { ClaimResponse } from '../../services/claim/ClaimServiceConstants';
import ResponseCode from '../../services/ResponseCode';
import ClaimListActions, { Types as ClaimListTypes } from '../../stores/claim/list/Actions';
import { localToArray } from '../../utils/ArrayUtil';

function* getClaimList(request: any) {
  yield put(ClaimListActions.claimListLoading());

  const claimList: ApiResponse<ClaimResponse> = yield call(ClaimService.getClaimList, request.payload);

  if (!claimList) {
    yield put(ClaimListActions.claimListFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (claimList.problem) {
    yield put(ClaimListActions.claimListFailure(claimList.problem));
    return
  }

  const result = localToArray(claimList.data)

  yield put(ClaimListActions.claimListSuccess(result));
}

export default [
  takeLatest(ClaimListTypes.GET_CLAIM_LIST, getClaimList),
]