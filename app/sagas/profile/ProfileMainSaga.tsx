import { call, put, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from '../../services/BaseApiConstants';
import { AddCompanyResponse, NewEmailResponse, NewPasswordResponse, ProfileBusinessResponse } from '../../services/profile/ProfileServiceConstants';
import ProfileService from '../../services/profile/ProfileService';
import ResponseCode from '../../services/ResponseCode';
import ProfileMainActions, { Types as ProfileMainTypes } from '../../stores/profile/main/Actions';
import { transformErrorArray } from '../../utils/ObjectUtil';

function* getProfileMain(request: any) {
  yield put(ProfileMainActions.profileMainLoading());

  const businessResponse: ApiResponse<ProfileBusinessResponse> = yield call(ProfileService.listCompany, request.payload);

  if (!businessResponse) {
    yield put(ProfileMainActions.profileMainFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (businessResponse.problem) {
    yield put(ProfileMainActions.profileMainFailure(businessResponse.problem));
    return
  }

  const result = {
    business: businessResponse.data?.payload?.map(business => ({
      ...business,
      key: String(business.id),
    })),
  }

  yield put(ProfileMainActions.profileMainSuccess(result));
}

function* postNewPassword(request: any) {
  yield put(ProfileMainActions.newPasswordLoading());

  const response: ApiResponse<NewPasswordResponse> = yield call(ProfileService.changePassword, request.payload);

  if (!response) {
    yield put(ProfileMainActions.newPasswordFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(ProfileMainActions.newPasswordFailure(response.problem));
    return
  }

  if (!response.data?.success) {
    yield put(ProfileMainActions.newPasswordFailure({
      code: ResponseCode.NOT_FOUND.code,
      message: transformErrorArray(response?.data?.msg?.error, response?.data?.msg),
    }));
    return
  }

  const result = {
    date: Number(new Date()),
    message: response.data.msg,
    success: response.data.success,
  }

  yield put(ProfileMainActions.newPasswordSuccess(result));
}

function* postNewEmail(request: any) {
  yield put(ProfileMainActions.newEmailLoading());

  const response: ApiResponse<NewEmailResponse> = yield call(ProfileService.changeEmail, request.payload);

  if (!response) {
    yield put(ProfileMainActions.newEmailFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(ProfileMainActions.newEmailFailure(response.problem));
    return
  }

  if (!response.data?.success) {
    yield put(ProfileMainActions.newEmailFailure({
      code: ResponseCode.NOT_FOUND.code,
      message: response?.data?.msg,
    }));
    return
  }

  const result = {
    date: Number(new Date()),
    message: response.data.msg,
    success: response.data.success,
  }

  yield put(ProfileMainActions.newEmailSuccess(result));
}

function* postNewCompany(request: any) {
  yield put(ProfileMainActions.newCompanyLoading());

  const response: ApiResponse<AddCompanyResponse> = yield call(ProfileService.addCompany, request.payload);

  if (!response || !response.data) {
    yield put(ProfileMainActions.newCompanyFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(ProfileMainActions.newCompanyFailure(response.problem));
    return
  }

  if (response.data?.error) {
    yield put(ProfileMainActions.newCompanyFailure({
      code: ResponseCode.NOT_FOUND.code,
      message: response.data.error,
    }));
    return
  }

  const result = {
    date: Number(new Date()),
    message: response.data.msg,
    success: response.data.success,
  }

  yield put(ProfileMainActions.getProfileMain())
  yield put(ProfileMainActions.newCompanySuccess(result));
}

export default [
  takeLatest(ProfileMainTypes.GET_PROFILE_MAIN, getProfileMain),
  takeLatest(ProfileMainTypes.POST_NEW_PASSWORD, postNewPassword),
  takeLatest(ProfileMainTypes.POST_NEW_EMAIL, postNewEmail),
  takeLatest(ProfileMainTypes.POST_NEW_COMPANY, postNewCompany),
]