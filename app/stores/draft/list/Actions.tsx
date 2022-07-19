import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../../StoreConstants';

const Types = {
  GET_DRAFT_LIST: 'GET_DRAFT_LIST',
  DRAFT_LIST_LOADING: 'DRAFT_LIST_LOADING',
  DRAFT_LIST_SUCCESS: 'DRAFT_LIST_SUCCESS',
  DRAFT_LIST_FAILURE: 'DRAFT_LIST_FAILURE',
}

const Creators = {
  getDraftList: createAction<any>(Types.GET_DRAFT_LIST),
  draftListLoading: createAction(Types.DRAFT_LIST_LOADING),
  draftListSuccess: createAction<any>(Types.DRAFT_LIST_SUCCESS),
  draftListFailure: createAction<ErrorObject>(Types.DRAFT_LIST_FAILURE),
}

export { Types };
export default Creators;