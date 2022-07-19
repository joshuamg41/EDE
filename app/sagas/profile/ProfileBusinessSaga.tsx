import { call, put, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from '../../services/BaseApiConstants';
import { ProfileBusinessResponse, UpdateBusinessResponse } from '../../services/profile/ProfileServiceConstants';
import ProfileService from '../../services/profile/ProfileService';
import ResponseCode from '../../services/ResponseCode';
import ProfileBusinessActions, { Types as ProfileBusinessTypes } from '../../stores/profile/business/Actions';
import { transformErrorArray } from '../../utils/ObjectUtil';
import ProfileMainActions from '../../stores/profile/main/Actions';

function* updateBusiness(request: any) {
  yield put(ProfileBusinessActions.updateBusinessLoading());

  const response: ApiResponse<UpdateBusinessResponse> = yield call(ProfileService.updateCompany, request.payload);

  if (!response) {
    yield put(ProfileBusinessActions.updateBusinessFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(ProfileBusinessActions.updateBusinessFailure(response.problem));
    return
  }

  if (!response.data?.success) {
    yield put(ProfileBusinessActions.updateBusinessFailure({
      code: ResponseCode.SERVER_ERROR.code,
      message: typeof (response.data?.msg) == 'object' ? transformErrorArray(response?.data?.msg?.error) : response?.data?.msg,
    }));
    return;
  }

  const result = {
    message: response.data?.msg,
    date: Number(new Date()),
  }

  yield put(ProfileMainActions.getProfileMain());
  yield put(ProfileBusinessActions.updateBusinessSuccess(result));
}

export default [
  takeLatest(ProfileBusinessTypes.UPDATE_BUSINESS, updateBusiness),
]