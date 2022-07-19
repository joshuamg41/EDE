import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../../StoreConstants';

const Types = {
  GET_CLAIM_DETAIL: 'GET_CLAIM_DETAIL',
  CLAIM_DETAIL_LOADING: 'CLAIM_DETAIL_LOADING',
  CLAIM_DETAIL_SUCCESS: 'CLAIM_DETAIL_SUCCESS',
  CLAIM_DETAIL_FAILURE: 'CLAIM_DETAIL_FAILURE',
}

const Creators = {
  getClaimTDetail: createAction<any>(Types.GET_CLAIM_DETAIL),
  claimDetailLoading: createAction(Types.CLAIM_DETAIL_LOADING),
  claimDetailSuccess: createAction<any>(Types.CLAIM_DETAIL_SUCCESS),
  claimDetailFailure: createAction<ErrorObject>(Types.CLAIM_DETAIL_FAILURE),
}

export { Types };
export default Creators;