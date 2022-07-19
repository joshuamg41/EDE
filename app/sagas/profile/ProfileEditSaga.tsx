import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from '../../services/BaseApiConstants';
import { UpdateCitizenResponse } from '../../services/profile/ProfileServiceConstants';
import ProfileService from '../../services/profile/ProfileService';
import ResponseCode from '../../services/ResponseCode';
import ProfileEditActions, { Types as ProfileEditTypes } from '../../stores/profile/edit/Actions';
import SigninActions from '../../stores/signin/Actions';
import { localToArray } from '../../utils/ArrayUtil';
import { transformErrorArray } from '../../utils/ObjectUtil';
import { localToString } from '../../utils/StringUtil';

function* getProvince(request: any) {
  yield put(ProfileEditActions.provinceLoading());

  const response: ApiResponse<any> = yield call(ProfileService.getProvince, request.payload);

  if (!response) {
    yield put(ProfileEditActions.provinceFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(ProfileEditActions.provinceFailure(response.problem));
    return
  }

  const result = localToArray(response.data?.provinces).map(province => {
    return {
      Id: localToString(province?.id),
      Name: localToString(province?.ctituloclas),
      Value: localToString(province?.bidclasif),
    }
  })

  yield put(ProfileEditActions.provinceSuccess(result));
}

function* getMunicipality(request: any) {
  yield put(ProfileEditActions.municipalityLoading());

  const response: ApiResponse<any> = yield call(ProfileService.getMunicipality, request.payload);

  if (!response) {
    yield put(ProfileEditActions.municipalityFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(ProfileEditActions.municipalityFailure(response.problem));
    return
  }

  const result = localToArray(response.data?.municipalities).map(municipality => {
    return {
      Id: localToString(municipality?.id),
      Name: localToString(municipality?.ctituloclas),
      Value: localToString(municipality?.bidclasif),
    }
  })

  yield put(ProfileEditActions.municipalitySuccess(result));
}

function* getSector(request: any) {
  yield put(ProfileEditActions.sectorLoading());

  const response: ApiResponse<any> = yield call(ProfileService.getSector, request.payload);

  if (!response) {
    yield put(ProfileEditActions.sectorFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(ProfileEditActions.sectorFailure(response.problem));
    return
  }

  const result = localToArray(response.data?.sectors).map(sector => {
    return {
      Id: localToString(sector?.id),
      Name: localToString(sector?.ctituloclas),
      Value: localToString(sector?.bidclasif),
    }
  })

  yield put(ProfileEditActions.sectorSuccess(result));
}

function* setProfileFields(request: any) {
  const { user } = yield select((state) => state.signin)
  yield all([
    put(ProfileEditActions.getProvince()),
    put(ProfileEditActions.getMunicipality(user.data?.province_id)),
    put(ProfileEditActions.getSector(user.data?.municipality_id)),
  ])
  return
}

function* postUpdateCitizen(request: any) {
  yield put(ProfileEditActions.updateCitizenLoading());

  const response: ApiResponse<UpdateCitizenResponse> = yield call(ProfileService.updateCitizen, request.payload);

  if (!response) {
    yield put(ProfileEditActions.updateCitizenFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(ProfileEditActions.updateCitizenFailure(response.problem));
    return
  }

  if (!response.data?.success) {
    yield put(ProfileEditActions.updateCitizenFailure({
      code: ResponseCode.SERVER_ERROR.code,
      message: typeof (response.data?.msg) == 'object' ? transformErrorArray(response?.data?.msg?.error) : response?.data?.msg,
    }));
    return;
  }

  yield put(SigninActions.refreshUserData(request.payload));

  const result = {
    message: response.data?.msg,
    success: true,
  }

  yield put(ProfileEditActions.updateCitizenSuccess(result));
}

function* deleteUser(request: any) {
  yield put(ProfileEditActions.deleteUserLoading());

  const response: ApiResponse<{success: boolean, msg: string}> = yield call(ProfileService.userDelete, {});

  if (!response) {
    yield put(ProfileEditActions.deleteUserFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(ProfileEditActions.deleteUserFailure(response.problem));
    return
  }

  if (!response.ok || !response.data?.success) {
    yield put(ProfileEditActions.deleteUserFailure(ResponseCode.BAD_REQUEST));
    return
  }

  const result = {
    success: true,
    message: response.data.msg
  }

  yield put(ProfileEditActions.deleteUserSuccess(result));
}

export default [
  takeLatest(ProfileEditTypes.GET_PROVINCE, getProvince),
  takeLatest(ProfileEditTypes.GET_MUNICIPALITY, getMunicipality),
  takeLatest(ProfileEditTypes.GET_SECTOR, getSector),
  takeLatest(ProfileEditTypes.SET_PROFILE_FIELDS, setProfileFields),
  takeLatest(ProfileEditTypes.POST_UPDATE_CITIZEN, postUpdateCitizen),
  takeLatest(ProfileEditTypes.DELETE_USER, deleteUser),
]