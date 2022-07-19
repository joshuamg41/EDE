import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from '../services/BaseApiConstants';
import ResponseCode from '../services/ResponseCode';
import SignupService from '../services/signup/SignupService';
import { ValidateDocumentResponse } from '../services/signup/SignupServiceConstants';
import SignupActions, { Types as SignupTypes } from '../stores/signup/Actions';
import { localToArray } from '../utils/ArrayUtil';
import { transformErrorArray } from '../utils/ObjectUtil';
import { localToString } from '../utils/StringUtil';

function* getSignup(request: any) {
  yield put(SignupActions.signupLoading());

  const [questionResponse, provinceResponse]: ApiResponse<any>[] = yield all([
    call(SignupService.getQuestionList, request.payload),
    call(SignupService.getProvince, request.payload),
  ])

  if (!questionResponse || !provinceResponse) {
    yield put(SignupActions.signupFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (questionResponse.problem || provinceResponse.problem) {
    yield put(SignupActions.signupFailure(questionResponse?.problem || provinceResponse?.problem));
    return
  }

  const result = {
    securityQuestion: localToArray(questionResponse.data?.payload).map(question => ({
      Id: localToString(question?.id),
      Name: localToString(question?.questions),
      Value: localToString(question?.id),
    })),
    provinceData: localToArray(provinceResponse.data?.provinces).map(province => ({
      Id: localToString(province?.id),
      Name: localToString(province?.ctituloclas),
      Value: localToString(province?.bidclasif),
    })),
  }

  yield put(SignupActions.signupSuccess(result));
}

function* getDocumentValidate(request: any) {
  yield put(SignupActions.documentValidateLoading(request.payload));

  const response: ApiResponse<ValidateDocumentResponse> = yield call(SignupService.getValidateDocument, request.payload);

  if (!response) {
    yield put(SignupActions.documentValidateFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(SignupActions.documentValidateFailure(response.problem));
    return
  }

  if (!response.data || !response.data.success) {
    yield put(SignupActions.documentValidateFailure(ResponseCode.SERVER_ERROR));
    return
  }

  const result = {
    ...response.data,
    payload: request.payload,
  }

  yield put(SignupActions.documentValidateSuccess(result));
}

function* getMunicipality(request: any) {
  yield put(SignupActions.municipalityLoading());

  const response: ApiResponse<any> = yield call(SignupService.getMunicipality, request.payload);

  if (!response) {
    yield put(SignupActions.municipalityFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(SignupActions.municipalityFailure(response.problem));
    return
  }

  const result = localToArray(response.data?.municipalities).map(municipality => {
    return {
      Id: localToString(municipality?.id),
      Name: localToString(municipality?.ctituloclas),
      Value: localToString(municipality?.bidclasif),
    }
  })

  yield put(SignupActions.municipalitySuccess(result));
}

function* getSector(request: any) {
  yield put(SignupActions.sectorLoading());

  const response: ApiResponse<any> = yield call(SignupService.getSector, request.payload);

  if (!response) {
    yield put(SignupActions.sectorFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(SignupActions.sectorFailure(response.problem));
    return
  }

  const result = localToArray(response.data?.sectors).map(sector => {
    return {
      Id: localToString(sector?.id),
      Name: localToString(sector?.ctituloclas),
      Value: localToString(sector?.bidclasif),
    }
  })

  yield put(SignupActions.sectorSuccess(result));
}

function* postRegister(request: any) {
  yield put(SignupActions.registerLoading())

  //our data Base
  const createUserResponse: ApiResponse<any> = yield call(SignupService.createUser, request.payload?.registerRequest)

  if (!createUserResponse || !createUserResponse.data || createUserResponse.problem?.code) {
    yield put(SignupActions.registerFailure(ResponseCode.SERVER_ERROR));
    return
  }

  if (!createUserResponse.data.success) {
    yield put(SignupActions.registerFailure({
      code: ResponseCode.SERVER_ERROR.code,
      message: typeof createUserResponse?.data?.msg == 'string' ? createUserResponse?.data?.msg : transformErrorArray(createUserResponse?.data?.msg?.error),
    }));
    return
  }

  //security question
  const questionResponse: ApiResponse<any> = yield call(SignupService.postSecurityQuestion, request.payload?.questionRequest)

  if (!questionResponse || !questionResponse.data || questionResponse.problem) {
    yield put(SignupActions.registerFailure(ResponseCode.SERVER_ERROR));
    return
  }

  if (!questionResponse.data?.success) {
    yield put(SignupActions.registerFailure({
      code: ResponseCode.NOT_FOUND.code,
      message: questionResponse.data?.msg,
    }));
    return
  }

  const result = {
    createRequest: request.payload,
    createDate: new Date(),
    message: createUserResponse.data?.msg,
  }

  yield put(SignupActions.registerSuccess(result));
}

export default [
  takeLatest(SignupTypes.GET_SIGNUP, getSignup),
  takeLatest(SignupTypes.GET_DOCUMENT_VALIDATE, getDocumentValidate),
  takeLatest(SignupTypes.POST_REGISTER, postRegister),
  takeLatest(SignupTypes.GET_MUNICIPALITY, getMunicipality),
  takeLatest(SignupTypes.GET_SECTOR, getSector),
]