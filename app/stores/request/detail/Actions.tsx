import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../../StoreConstants';

const Types = {
  GET_REQUEST_DETAIL: 'GET_REQUEST_DETAIL',
  REQUEST_DETAIL_LOADING: 'REQUEST_DETAIL_LOADING',
  REQUEST_DETAIL_SUCCESS: 'REQUEST_DETAIL_SUCCESS',
  REQUEST_DETAIL_FAILURE: 'REQUEST_DETAIL_FAILURE',
}

const Creators = {
  getRequestDetail: createAction<any>(Types.GET_REQUEST_DETAIL),
  requestDetailLoading: createAction(Types.REQUEST_DETAIL_LOADING),
  requestDetailSuccess: createAction<any>(Types.REQUEST_DETAIL_SUCCESS),
  requestDetailFailure: createAction<ErrorObject>(Types.REQUEST_DETAIL_FAILURE),
}

export { Types };
export default Creators;