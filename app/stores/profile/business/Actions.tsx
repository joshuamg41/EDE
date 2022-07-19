import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../../StoreConstants';

const Types = {
  UPDATE_BUSINESS: 'UPDATE_BUSINESS',
  UPDATE_BUSINESS_LOADING: 'UPDATE_BUSINESS_LOADING',
  UPDATE_BUSINESS_SUCCESS: 'UPDATE_BUSINESS_SUCCESS',
  UPDATE_BUSINESS_FAILURE: 'UPDATE_BUSINESS_FAILURE',
}

const Creators = {
  updateBusiness: createAction<any>(Types.UPDATE_BUSINESS),
  updateBusinessLoading: createAction(Types.UPDATE_BUSINESS_LOADING),
  updateBusinessSuccess: createAction<any>(Types.UPDATE_BUSINESS_SUCCESS),
  updateBusinessFailure: createAction<ErrorObject>(Types.UPDATE_BUSINESS_FAILURE),
}

export { Types };
export default Creators;