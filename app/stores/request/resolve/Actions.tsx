import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../../StoreConstants';

const Types = {
  POST_REQUEST_RESOLVE: 'POST_REQUEST_RESOLVE',
  POST_DOCUMENT_RESOLVE: 'POST_DOCUMENT_RESOLVE',

  REQUEST_RESOLVE_LOADING: 'REQUEST_RESOLVE_LOADING',
  REQUEST_RESOLVE_SUCCESS: 'REQUEST_RESOLVE_SUCCESS',
  REQUEST_RESOLVE_FAILURE: 'REQUEST_RESOLVE_FAILURE',
}

const Creators = {
  postRequestResolve: createAction<any>(Types.POST_REQUEST_RESOLVE),
  postDocumentResolve: createAction<any>(Types.POST_DOCUMENT_RESOLVE),
  requestResolveLoading: createAction(Types.REQUEST_RESOLVE_LOADING),
  requestResolveSuccess: createAction<any>(Types.REQUEST_RESOLVE_SUCCESS),
  requestResolveFailure: createAction<ErrorObject>(Types.REQUEST_RESOLVE_FAILURE),
}

export { Types };
export default Creators;