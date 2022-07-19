import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../../StoreConstants';

const Types = {
  GET_REQUEST_LIST: 'GET_REQUEST_LIST',
  REQUEST_LIST_LOADING: 'REQUEST_LIST_LOADING',
  REQUEST_LIST_SUCCESS: 'REQUEST_LIST_SUCCESS',
  REQUEST_LIST_FAILURE: 'REQUEST_LIST_FAILURE',

  GET_MORE_REQUEST: 'GET_MORE_REQUEST',
  MORE_REQUEST_LOADING: 'MORE_REQUEST_LOADING',
  MORE_REQUEST_SUCCESS: 'MORE_REQUEST_SUCCESS',
  MORE_REQUEST_FAILURE: 'MORE_REQUEST_FAILURE',

  GET_USER_STATISTIC: 'GET_USER_STATISTIC',
  USER_STATISTIC_LOADING: 'USER_STATISTIC_LOADING',
  USER_STATISTIC_SUCCESS: 'USER_STATISTIC_SUCCESS',
  USER_STATISTIC_FAILURE: 'USER_STATISTIC_FAILURE',
}

const Creators = {
  getRequestList: createAction<any>(Types.GET_REQUEST_LIST),
  requestListLoading: createAction(Types.REQUEST_LIST_LOADING),
  requestListSuccess: createAction<any>(Types.REQUEST_LIST_SUCCESS),
  requestListFailure: createAction<ErrorObject>(Types.REQUEST_LIST_FAILURE),

  getMoreRequest: createAction<any>(Types.GET_MORE_REQUEST),
  moreRequestLoading: createAction(Types.MORE_REQUEST_LOADING),
  moreRequestSuccess: createAction<any>(Types.MORE_REQUEST_SUCCESS),
  moreRequestFailure: createAction<ErrorObject>(Types.MORE_REQUEST_FAILURE),

  getUserStatistic: createAction<any>(Types.GET_USER_STATISTIC),
  userStatisticLoading: createAction(Types.USER_STATISTIC_LOADING),
  userStatisticSuccess: createAction<any>(Types.USER_STATISTIC_SUCCESS),
  userStatisticFailure: createAction<ErrorObject>(Types.USER_STATISTIC_FAILURE),
}

export { Types };
export default Creators;