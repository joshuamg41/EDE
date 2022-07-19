import { call, put, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from '../../services/BaseApiConstants';
import ClaimService from '../../services/claim/ClaimService';
import { IssueResponse, PostClaimResponse } from '../../services/claim/ClaimServiceConstants';
import ResponseCode from '../../services/ResponseCode';
import ClaimSolicitudeActions, { Types as ClaimSolicitudeTypes } from '../../stores/claim/solicitude/Actions';
import { localToArray } from '../../utils/ArrayUtil';

function* getClaimSolicitude(request: any) {
  yield put(ClaimSolicitudeActions.claimSolicitudeLoading());

  const issueList: ApiResponse<IssueResponse> = yield call(ClaimService.getIssueList, request.payload);

  if (!issueList) {
    yield put(ClaimSolicitudeActions.claimSolicitudeFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (issueList.problem) {
    yield put(ClaimSolicitudeActions.claimSolicitudeFailure(issueList.problem));
    return
  }

  const result = {
    issueList: localToArray(issueList.data)?.map(issue => ({
      Id: String(issue.id),
      Value: String(issue.id),
      Name: issue.content,
    }))
  }

  yield put(ClaimSolicitudeActions.claimSolicitudeSuccess(result));
}

function* postClaimSolicitude(request: any) {
  yield put(ClaimSolicitudeActions.postClaimSolicitudeLoading());

  const response: ApiResponse<PostClaimResponse> = yield call(ClaimService.postClaim, request.payload);

  if (!response) {
    yield put(ClaimSolicitudeActions.postClaimSolicitudeFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(ClaimSolicitudeActions.postClaimSolicitudeFailure(response.problem));
    return
  }

  const result = {
    ...response.data,
    date: new Date(),
  }

  yield put(ClaimSolicitudeActions.postClaimSolicitudeSuccess(result));
}

export default [
  takeLatest(ClaimSolicitudeTypes.GET_CLAIM_SOLICITUDE, getClaimSolicitude),
  takeLatest(ClaimSolicitudeTypes.POST_CLAIM_SOLICITUDE, postClaimSolicitude),
]