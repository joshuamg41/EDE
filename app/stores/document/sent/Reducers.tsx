import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { DocumentSentInitialState } from './InitialState';

const getLoading = (state: DocumentSentInitialState, action: ActionObject) => ({
  ...state,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: DocumentSentInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: DocumentSentInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: action.payload,
});

export const DocumentSentReducer = createReducer(INITIAL_STATE, {
  [Types.DOCUMENT_SENT_LOADING]: getLoading,
  [Types.DOCUMENT_SENT_SUCCESS]: getSuccess,
  [Types.DOCUMENT_SENT_FAILURE]: getFailure,
});