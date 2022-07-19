import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../../StoreConstants';

const Types = {
  GET_SERVICE_DETAIL: 'GET_SERVICE_DETAIL',
  SERVICE_DETAIL_LOADING: 'SERVICE_DETAIL_LOADING',
  SERVICE_DETAIL_SUCCESS: 'SERVICE_DETAIL_SUCCESS',
  SERVICE_DETAIL_FAILURE: 'SERVICE_DETAIL_FAILURE',

  SET_SERVICE_PRICE: 'SET_SERVICE_PRICE'
}

const Creators = {
  getServiceDetail: createAction<{
    head: {
      id: string | number
    },
    navigate?: string,
    body: {
      citizen_id?: string
    },
  }>(Types.GET_SERVICE_DETAIL),
  serviceDetailLoading: createAction<any>(Types.SERVICE_DETAIL_LOADING),
  serviceDetailSuccess: createAction<any>(Types.SERVICE_DETAIL_SUCCESS),
  serviceDetailFailure: createAction<ErrorObject>(Types.SERVICE_DETAIL_FAILURE),

  setServicePrice: createAction<any>(Types.SET_SERVICE_PRICE),
}

export { Types };
export default Creators;