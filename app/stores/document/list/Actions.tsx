import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../../StoreConstants';

const Types = {
  GET_DOCUMENT_LIST: 'GET_DOCUMENT_LIST',
  DOCUMENT_LIST_LOADING: 'DOCUMENT_LIST_LOADING',
  DOCUMENT_LIST_SUCCESS: 'DOCUMENT_LIST_SUCCESS',
  DOCUMENT_LIST_FAILURE: 'DOCUMENT_LIST_FAILURE',

  GET_MORE_DOCUMENT: 'GET_MORE_DOCUMENT',
  MORE_DOCUMENT_LOADING: 'MORE_DOCUMENT_LOADING',
  MORE_DOCUMENT_SUCCESS: 'MORE_DOCUMENT_SUCCESS',
  MORE_DOCUMENT_FAILURE: 'MORE_DOCUMENT_FAILURE',

  DOCUMENT_QUERY: 'DOCUMENT_QUERY',
}

const Creators = {
  getDocumentList: createAction<any>(Types.GET_DOCUMENT_LIST),
  documentListLoading: createAction(Types.DOCUMENT_LIST_LOADING),
  documentListSuccess: createAction<any>(Types.DOCUMENT_LIST_SUCCESS),
  documentListFailure: createAction<ErrorObject>(Types.DOCUMENT_LIST_FAILURE),

  getMoreDocument: createAction<any>(Types.GET_MORE_DOCUMENT),
  moreDocumentLoading: createAction(Types.MORE_DOCUMENT_LOADING),
  moreDocumentSuccess: createAction<any>(Types.MORE_DOCUMENT_SUCCESS),
  moreDocumentFailure: createAction<ErrorObject>(Types.MORE_DOCUMENT_FAILURE),

  documentQuery: createAction<string>(Types.DOCUMENT_QUERY),
}

export { Types };
export default Creators;