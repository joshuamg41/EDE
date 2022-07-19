import { all, call, put, takeLatest, takeLeading } from 'redux-saga/effects';
import { RenderFieldProps } from '../../components/form/components/RenderField';
import { ApiResponse } from '../../services/BaseApiConstants';
import ResponseCode from '../../services/ResponseCode';
import ServiceService from '../../services/service/ServiceService';
import { DppResponse, FileUploadResponse, MimarenaResponse, PostServiceSolicitudeResponse, ServiceSolicitudeResponse } from '../../services/service/ServiceServiceConstants';
import ServiceSolicitudeActions, { Types as ServiceSolicitudeTypes } from '../../stores/service/solicitude/Actions';
import { localToArray, transformField } from '../../utils/ArrayUtil';
import { localToString, searchInString } from '../../utils/StringUtil';

function* getServiceSolicitude(request: any) {
  yield put(ServiceSolicitudeActions.serviceSolicitudeLoading());

  const response: ApiResponse<ServiceSolicitudeResponse> = yield call(ServiceService.getServiceSolicitude, request.payload);

  if (!response || !response.data) {
    yield put(ServiceSolicitudeActions.serviceSolicitudeFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(ServiceSolicitudeActions.serviceSolicitudeFailure(ResponseCode[localToString(response.problem, 'SERVER_ERROR')]));
    return
  }

  //separating response by steps
  const plainData: RenderFieldProps[] = []
  const data = response.data.fields
  const _data: RenderFieldProps[][] = []
  for (let i = 0; i < data.length; i++) {
    const step = data[i]
    let _step: RenderFieldProps[] = []
    for (let j = 0; j < step.length; j++) {
      const field = step[j]
      plainData.push(field)
      if (_step.length && field.subtype == 'h1') {
        _data.push(_step)
        _step = []
      }
      _step.push(field)
      if ((step.length - 1) == j) {
        _data.push(_step)
        _step = []
      }
    }
  }

  const result = {
    formulary_data: response.data.formulary_data,
    data: _data.map(step => step.map(transformField)),
    // Mocked
    // data: _data.map(step => step.map(transformField)).reverse(),
    plainData: plainData.map(transformField),
    saved_fields: response.data.saved_fields,
    date: Number(new Date()),
  }

  yield put(ServiceSolicitudeActions.serviceSolicitudeSuccess(result));
}

function* postServiceSolicitude(request: any) {
  yield put(ServiceSolicitudeActions.postServiceSolicitudeLoading());

  //Upload File
  let fileResponse: ApiResponse<FileUploadResponse> | undefined = undefined

  if (localToArray(request.payload?.fileRequest?.newFile).length) {
    fileResponse = yield call(ServiceService.uploadFile, request.payload?.fileRequest?.newFile);

    if (!fileResponse) {
      yield put(ServiceSolicitudeActions.postServiceSolicitudeFailure(ResponseCode.BAD_REQUEST));
      return
    }

    if (fileResponse.problem) {
      yield put(ServiceSolicitudeActions.postServiceSolicitudeFailure(fileResponse.problem));
      return
    }

    if (!fileResponse.data?.success) {
      yield put(ServiceSolicitudeActions.postServiceSolicitudeFailure({
        code: 500,
        message: fileResponse?.data?.message,
      }));
      return
    }
  }

  //Transform documents
  const documents: any[] = []
  if (
    localToArray(request.payload?.fileRequest?.newFile).length ||
    localToArray(request.payload?.fileRequest?.oldFile).length
  ) {
    if (fileResponse?.data?.files && Array.isArray(fileResponse?.data?.files)) {
      for (const file of fileResponse?.data?.files) {
        const label = localToArray(request.payload?.softExpertData).find((fileRequestItem) => searchInString(fileRequestItem?.filename, file.name))?.label
        documents.push({
          ...file,
          name: searchInString(file?.name, 'rn_image_picker') ? label : file?.name,
          label: label,
        })
      }
    }

    if (fileResponse?.data?.files && Array.isArray(fileResponse?.data?.files)) {
      for (const file of request.payload?.fileRequest?.oldFile) {
        documents.push({
          name: file?.name,
          extension: file?.extension,
          type: file?.extension == 'pdf' ? 'application/pdf' : `image/${file?.extension}`,
          route: file?.route,
          label: file?.label,
        })
      }
    }
  }

  //Post form
  const _solicitudeRequest = {
    ...request.payload?.solicitudeRequest,
    documents: request.payload?.send ?
      [] :
      localToArray(documents).map(document => ({ documents: [document], names: [document?.label], ...request.payload?.associateRequest }))
  }
  const response: ApiResponse<PostServiceSolicitudeResponse> = yield call(ServiceService.postServiceSolicitude, _solicitudeRequest);

  if (!response) {
    yield put(ServiceSolicitudeActions.postServiceSolicitudeFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(ServiceSolicitudeActions.postServiceSolicitudeFailure(response.problem));
    return
  }

  if (
    localToArray(request.payload?.fileRequest?.newFile).length ||
    localToArray(request.payload?.fileRequest?.oldFile).length
  ) {
    //Associate to softExpert
    if (request.payload?.send) {
      const associateRequest = {
        ...request.payload?.associateRequest,
        title: response.data?.title,
        record_id: response.data?.code,
        acronym: response.data?.acronym,
        attribute: response.data?.attributes,
      }

      const associateSoftexpertResponse: ApiResponse<any> = yield all(
        localToArray(documents).map(document => {
          return call(ServiceService.associateFileSoftexpert, { ...associateRequest, documents: [document], names: [document?.label] })
        })
      )

      if (localToArray(associateSoftexpertResponse).find(response => response.problem)) {
        yield put(ServiceSolicitudeActions.postServiceSolicitudeFailure(ResponseCode.SERVER_ERROR));
        return
      }
    }

    //Associate to BackOffice
    const associateBackofficeResponse: ApiResponse<any> = yield call(ServiceService.associateFileBackoffice, { body: { documents, voucher: false, status: true }, requestID: response.data?.RequestID });

    if (!associateBackofficeResponse) {
      yield put(ServiceSolicitudeActions.postServiceSolicitudeFailure(ResponseCode.BAD_REQUEST));
      return
    }

    if (associateBackofficeResponse.problem) {
      yield put(ServiceSolicitudeActions.postServiceSolicitudeFailure(associateBackofficeResponse.problem));
      return
    }
  }

  const result = {
    ...response.data,
  }

  yield put(ServiceSolicitudeActions.postServiceSolicitudeSuccess(result));
}

function* saveServiceSolicitude(request: any) {
  yield put(ServiceSolicitudeActions.saveServiceSolicitudeLoading());

  const response: ApiResponse<any> = yield call(ServiceService.saveForm, request.payload);

  if (!response || !response.data) {
    yield put(ServiceSolicitudeActions.saveServiceSolicitudeFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(ServiceSolicitudeActions.saveServiceSolicitudeFailure(response.problem));
    return
  }

  const result = {
    ...response.data,
    ...request.payload,
    date: new Date(),
  }

  yield put(ServiceSolicitudeActions.saveServiceSolicitudeSuccess(result));
}

function* getMimarenaValidate(request: any) {
  yield put(ServiceSolicitudeActions.mimarenaValidateLoading(request.payload));

  const response: ApiResponse<MimarenaResponse> = yield call(ServiceService.getMimarenaValidation, request.payload);

  if (!response) {
    yield put(ServiceSolicitudeActions.mimarenaValidateFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(ServiceSolicitudeActions.mimarenaValidateFailure(response.problem));
    return
  }

  const result = {
    ...response.data,
    payload: request.payload,
  }

  yield put(ServiceSolicitudeActions.mimarenaValidateSuccess(result));
}

function* getDppValidate(request: any) {
  yield put(ServiceSolicitudeActions.dppValidateLoading(request.payload));

  const response: ApiResponse<DppResponse> = yield call(ServiceService.getDppValidation, request.payload);

  if (!response) {
    yield put(ServiceSolicitudeActions.dppValidateFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(ServiceSolicitudeActions.dppValidateFailure(response.problem));
    return
  }

  const result = {
    ...response.data,
    payload: request.payload,
  }

  yield put(ServiceSolicitudeActions.dppValidateSuccess(result));
}

export default [
  takeLatest(ServiceSolicitudeTypes.GET_SERVICE_SOLICITUDE, getServiceSolicitude),
  takeLatest(ServiceSolicitudeTypes.POST_SERVICE_SOLICITUDE, postServiceSolicitude),
  takeLeading(ServiceSolicitudeTypes.SAVE_SERVICE_SOLICITUDE, saveServiceSolicitude),
  takeLatest(ServiceSolicitudeTypes.GET_MIMARENA_VALIDATE, getMimarenaValidate),
  takeLatest(ServiceSolicitudeTypes.GET_DPP_VALIDATE, getDppValidate),
]