import moment from 'moment';
import OneSignal from 'react-native-onesignal';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ApiResponse, GenericApiResponse } from '../services/BaseApiConstants';
import ResponseCode from '../services/ResponseCode';
import SigninService from '../services/signin/SigninService';
import { GetUserDataResponse, SendResetPasswordResponse, SigninResponse } from '../services/signin/SigninServiceConstants';
import SigninActions, { Types as SigninTypes } from '../stores/signin/Actions';
import { localToObject } from '../utils/ObjectUtil';
import { localToString } from '../utils/StringUtil';

export function* login(request: any) {
  yield put(SigninActions.loginLoading());

  //authService
  const authResponse: ApiResponse<SigninResponse> = yield call(SigninService.authUser, request.payload)

  if (!authResponse) {
    yield put(SigninActions.loginFailure({
      code: ResponseCode.BAD_REQUEST.code,
      message: 'Usuario o contraseña incorrecta',
    }));
    return
  }

  if (authResponse.problem?.code == ResponseCode.NETWORK_ERROR.code) {
    yield put(SigninActions.loginFailure(ResponseCode.NETWORK_ERROR));
    return
  }

  if (authResponse.problem?.code == ResponseCode.CONNECTION_ERROR.code) {
    yield put(SigninActions.loginFailure(ResponseCode.CONNECTION_ERROR));
    return
  }

  if (authResponse.problem) {
    yield put(SigninActions.loginFailure(ResponseCode.SERVER_ERROR));
    return
  }

  if (!authResponse.data?.success) {
    yield put(SigninActions.loginFailure({
      code: ResponseCode.SERVER_ERROR.code,
      message: authResponse.data?.msg,
    }));
    return;
  }

  const result = {
    isLogged: true,
    authRequest: request.payload,
  }

  //Getting user Data
  //@ts-ignore
  const userData: ApiResponse<GetUserDataResponse> = yield call(SigninService.getUserData, {})

  if (!userData.data || !userData.ok || !userData.data.success) {
    return false;
  }

  //Setting user Data to other service
  const userInfoRequest = {
    id: userData.data?.payload?.citizen_id,
    mail: userData.data?.payload?.email,
    name: userData.data?.payload?.name,
    surname: userData.data?.payload?.first_last_name,
    secsurname: userData.data?.payload?.second_last_name,
    phone: userData.data?.payload?.phone,
    city: userData.data?.payload?.province,
    created_date: {
      date: moment().format('YYYY-MM-DDHH:mm:ss.000000'),
      timezone_type: 3,
      timezone: 'UTC'
    }
  }
  const userInfoResponse: ApiResponse<GenericApiResponse> = yield call(SigninService.postUserInfo, userInfoRequest)

  const userResult = {
    ...localToObject(userData.data.payload),
    profile_img: authResponse.data.payload?.profile_img,
  }

  OneSignal.disablePush(false)
  console.log('setExternalUserId', localToString(userData.data?.payload?.email))
  OneSignal.setExternalUserId(localToString(userData.data?.payload?.email), authResponse.data.payload?.token, (response) => console.log('setExternalUserId', response));

  yield put(SigninActions.refreshUserDataSuccess(userResult))
  yield put(SigninActions.loginSuccess(result));
}

function* refreshUserData() {
  const userData: ApiResponse<GenericApiResponse> = yield call(SigninService.getUserData, {})

  if (!userData.data || !userData.ok || !userData.data.success) {
    return false;
  }

  const result = localToObject(userData.data.payload)

  yield put(SigninActions.refreshUserDataSuccess(result))
  return true
}

function* refreshToken() {
  yield call(SigninService.getNewToken)
}

function* callForgotPassword(request: any) {
  yield put(SigninActions.forgotPasswordLoading());

  const response: ApiResponse<SendResetPasswordResponse> = yield call(SigninService.sendResetPassword, request.payload);

  if (!response) {
    yield put(SigninActions.forgotPasswordFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(SigninActions.forgotPasswordFailure(response.problem));
    return
  }

  const result = response.data

  yield put(SigninActions.forgotPasswordSuccess(result));
}

export default [
  takeLatest(SigninTypes.LOGIN, login),
  takeLatest(SigninTypes.REFRESH_USER_DATA, refreshUserData),
  takeLatest(SigninTypes.REFRESH_TOKEN, refreshToken),
  takeLatest(SigninTypes.CALL_FORGOT_PASSWORD, callForgotPassword),
]