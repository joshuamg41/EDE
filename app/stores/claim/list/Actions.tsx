import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../../StoreConstants';

const Types = {
  GET_CLAIM_LIST: 'GET_CLAIM_LIST',
  CLAIM_LIST_LOADING: 'CLAIM_LIST_LOADING',
  CLAIM_LIST_SUCCESS: 'CLAIM_LIST_SUCCESS',
  CLAIM_LIST_FAILURE: 'CLAIM_LIST_FAILURE',
}

const Creators = {
  getClaimList: createAction<any>(Types.GET_CLAIM_LIST),
  claimListLoading: createAction(Types.CLAIM_LIST_LOADING),
  claimListSuccess: createAction<any>(Types.CLAIM_LIST_SUCCESS),
  claimListFailure: createAction<ErrorObject>(Types.CLAIM_LIST_FAILURE),
}

export { Types };
export default Creators;