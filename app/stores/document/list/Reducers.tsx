import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { DocumentListInitialState } from './InitialState';

const getLoading = (state: DocumentListInitialState, action: ActionObject) => ({
  ...state,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: DocumentListInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: DocumentListInitialState, action: ActionObject) => ({
  ...state,
  getLoading: false,
  getError: action.payload,
});

const moreLoading = (state: DocumentListInitialState, action: ActionObject) => ({
  ...state,
  moreLoading: true,
  moreError: INITIAL_STATE.moreError,
});

const moreSuccess = (state: DocumentListInitialState, action: ActionObject) => ({
  ...state,
  moreData: action.payload,
  moreLoading: false,
  moreError: INITIAL_STATE.moreError,
});

const moreFailure = (state: DocumentListInitialState, action: ActionObject) => ({
  ...state,
  moreData: INITIAL_STATE.moreData,
  moreLoading: false,
  moreError: action.payload,
});

const documentQuery = (state: DocumentListInitialState, action: ActionObject) => ({
  ...state,
  query: action.payload,
});

export const DocumentListReducer = createReducer(INITIAL_STATE, {
  [Types.DOCUMENT_LIST_LOADING]: getLoading,
  [Types.DOCUMENT_LIST_SUCCESS]: getSuccess,
  [Types.DOCUMENT_LIST_FAILURE]: getFailure,

  [Types.MORE_DOCUMENT_LOADING]: moreLoading,
  [Types.MORE_DOCUMENT_SUCCESS]: moreSuccess,
  [Types.MORE_DOCUMENT_FAILURE]: moreFailure,

  [Types.DOCUMENT_QUERY]: documentQuery,
});