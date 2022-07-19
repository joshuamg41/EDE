import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../../StoreConstants';

const Types = {
  GET_SERVICE_LIST: 'GET_SERVICE_LIST',
  SERVICE_LIST_LOADING: 'SERVICE_LIST_LOADING',
  SERVICE_LIST_SUCCESS: 'SERVICE_LIST_SUCCESS',
  SERVICE_LIST_FAILURE: 'SERVICE_LIST_FAILURE',

  SET_QUERY: 'SET_QUERY',
}

const Creators = {
  getServiceList: createAction<any | undefined>(Types.GET_SERVICE_LIST),
  serviceListLoading: createAction(Types.SERVICE_LIST_LOADING),
  serviceListSuccess: createAction<any>(Types.SERVICE_LIST_SUCCESS),
  serviceListFailure: createAction<ErrorObject>(Types.SERVICE_LIST_FAILURE),
  setQuery: createAction<string | undefined>(Types.SET_QUERY),
}

export { Types };
export default Creators;