import { call, delay, put, select, takeEvery, takeLatest, takeLeading } from 'redux-saga/effects';
import { ApiResponse } from '../../services/BaseApiConstants';
import DocumentDocument from '../../services/document/DocumentService';
import { DocumentListResponse } from '../../services/document/DocumentServiceConstants';
import ResponseCode from '../../services/ResponseCode';
import { RootState } from '../../stores/AppReducers';
import DocumentListActions, { Types as DocumentListTypes } from '../../stores/document/list/Actions';

function* getDocumentList(request: any) {
  yield put(DocumentListActions.documentListLoading());

  const response: ApiResponse<DocumentListResponse> = yield call(DocumentDocument.getDocumentList, request.payload);

  if (!response) {
    yield put(DocumentListActions.documentListFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(DocumentListActions.documentListFailure(response.problem));
    return
  }

  const { getData } = yield select((state: RootState) => state.documentList)

  const result = {
    ...getData,
    [request.payload?.origin]: response.data,
  }

  yield put(DocumentListActions.documentListSuccess(result));
}

function* getMoreRequest(request: any) {
  yield put(DocumentListActions.moreDocumentLoading());

  const response: ApiResponse<DocumentListResponse> = yield call(DocumentDocument.getDocumentList, request.payload);

  if (!response || !response.data) {
    yield delay(30000)
    yield put(DocumentListActions.moreDocumentFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield delay(30000)
    yield put(DocumentListActions.moreDocumentFailure(response.problem));
    return
  }

  const getData: {
    0: DocumentListResponse;
    1: DocumentListResponse;
  } = yield select((state: RootState) => state.documentList.getData)

  const result = {
    ...getData,
    [request.payload?.origin]: {
      ...response.data,
      data: [
        //@ts-ignore
        ...getData?.[request.payload?.origin]?.data,
        ...response.data.data,
      ]
    }
  }

  yield put(DocumentListActions.moreDocumentSuccess({
    date: Number(new Date())
  }));
  yield put(DocumentListActions.documentListSuccess(result));
}


export default [
  takeEvery(DocumentListTypes.GET_DOCUMENT_LIST, getDocumentList),
  takeLeading(DocumentListTypes.GET_MORE_DOCUMENT, getMoreRequest),
]