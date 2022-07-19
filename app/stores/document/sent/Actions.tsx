import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../../StoreConstants';

const Types = {
  GET_DOCUMENT_SENT: 'GET_DOCUMENT_SENT',
  DOCUMENT_SENT_LOADING: 'DOCUMENT_SENT_LOADING',
  DOCUMENT_SENT_SUCCESS: 'DOCUMENT_SENT_SUCCESS',
  DOCUMENT_SENT_FAILURE: 'DOCUMENT_SENT_FAILURE',
}

const Creators = {
  getDocumentSent: createAction<any>(Types.GET_DOCUMENT_SENT),
  documentSentLoading: createAction(Types.DOCUMENT_SENT_LOADING),
  documentSentSuccess: createAction<any>(Types.DOCUMENT_SENT_SUCCESS),
  documentSentFailure: createAction<ErrorObject>(Types.DOCUMENT_SENT_FAILURE),
}

export { Types };
export default Creators;