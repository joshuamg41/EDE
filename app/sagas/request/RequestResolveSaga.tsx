import { all, call, put, select, takeLatest, takeLeading } from 'redux-saga/effects';
import { ApiResponse } from '../../services/BaseApiConstants';
import RequestService from '../../services/request/RequestService';
import { RequestDetailResponse, RequestResolveResponse } from '../../services/request/RequestServiceConstants';
import ResponseCode from '../../services/ResponseCode';
import ServiceService from '../../services/service/ServiceService';
import { FileUploadResponse } from '../../services/service/ServiceServiceConstants';
import RequestResolveActions, { Types as RequestResolveTypes } from '../../stores/request/resolve/Actions';
import { localToArray } from '../../utils/ArrayUtil';
import RequestDetailActions, { Types as RequestDetailTypes } from '../../stores/request/detail/Actions';
import { RootState } from '../../stores/AppReducers';
import moment from 'moment';

function* postRequestResolve(request: any) {
  yield put(RequestResolveActions.requestResolveLoading());

  const response: ApiResponse<RequestResolveResponse> = yield call(RequestService.postTextResolve, request.payload);

  if (!response) {
    yield put(RequestResolveActions.requestResolveFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(RequestResolveActions.requestResolveFailure(response.problem));
    return
  }

  const result = {
    success: true,
    ...response.data,
  }

  const getData: RequestDetailResponse = yield select((state: RootState) => state.requestDetail.getData)
  const comment = {
    id: 1,
    user_id: 1,
    request_id: getData?.request?.id,
    text: request.payload?.entityAttributeValue,
    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
  }
  const newGetData = {
    ...getData,
    request: {
      ...getData?.request,
      comments: [
        ...getData?.request?.comments,
        comment,
      ]
    }
  }

  yield put(RequestDetailActions.requestDetailSuccess(newGetData));
  yield put(RequestResolveActions.requestResolveSuccess(result));
}

function* postDocumentResolve(request: any) {
  yield put(RequestResolveActions.requestResolveLoading());

  //Upload File
  const fileResponse: ApiResponse<FileUploadResponse> = yield call(ServiceService.uploadFile, request.payload?.fileRequest);

  if (!fileResponse) {
    yield put(RequestResolveActions.requestResolveFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (fileResponse.problem) {
    yield put(RequestResolveActions.requestResolveFailure(fileResponse.problem));
    return
  }

  const documents = localToArray(fileResponse?.data?.files).map(file => {
    return {
      ...file,
      label: request.payload?.label,
    }
  })

  //associate to softExpert
  const associateRequest = {
    documents,
    ...request.payload?.associateRequest,
  }

  const associateSoftexpertResponse: ApiResponse<any> = yield all(
    localToArray(documents).map(document => {
      return call(ServiceService.associateFileSoftexpert, { ...associateRequest, documents: [document] })
    })
  );

  if (localToArray(associateSoftexpertResponse).find(response => response.problem)) {
    yield put(RequestResolveActions.requestResolveFailure(ResponseCode.SERVER_ERROR));
    return
  }

  //Associate to BackOffice
  const associateBackofficeResponse: ApiResponse<any> = yield call(ServiceService.associateFileBackoffice, { body: { documents, voucher: request.payload?.voucher }, requestID: request.payload?.RequestID });

  if (!associateBackofficeResponse) {
    yield put(RequestResolveActions.requestResolveFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (associateBackofficeResponse.problem) {
    yield put(RequestResolveActions.requestResolveFailure(associateBackofficeResponse.problem));
    return
  }

  const result = {
    success: true,
    ...associateBackofficeResponse.data,
  }

  yield put(RequestResolveActions.requestResolveSuccess(result));
}

export default [
  takeLeading(RequestResolveTypes.POST_REQUEST_RESOLVE, postRequestResolve),
  takeLeading(RequestResolveTypes.POST_DOCUMENT_RESOLVE, postDocumentResolve),
]