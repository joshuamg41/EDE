import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../../StoreConstants';

const Types = {
  GET_CLAIM_SOLICITUDE: 'GET_CLAIM_SOLICITUDE',
  CLAIM_SOLICITUDE_LOADING: 'CLAIM_SOLICITUDE_LOADING',
  CLAIM_SOLICITUDE_SUCCESS: 'CLAIM_SOLICITUDE_SUCCESS',
  CLAIM_SOLICITUDE_FAILURE: 'CLAIM_SOLICITUDE_FAILURE',

  POST_CLAIM_SOLICITUDE: 'POST_CLAIM_SOLICITUDE',
  POST_CLAIM_SOLICITUDE_LOADING: 'POST_CLAIM_SOLICITUDE_LOADING',
  POST_CLAIM_SOLICITUDE_SUCCESS: 'POST_CLAIM_SOLICITUDE_SUCCESS',
  POST_CLAIM_SOLICITUDE_FAILURE: 'POST_CLAIM_SOLICITUDE_FAILURE',
}

const Creators = {
  getClaimSolicitude: createAction(Types.GET_CLAIM_SOLICITUDE),
  claimSolicitudeLoading: createAction(Types.CLAIM_SOLICITUDE_LOADING),
  claimSolicitudeSuccess: createAction<any>(Types.CLAIM_SOLICITUDE_SUCCESS),
  claimSolicitudeFailure: createAction<ErrorObject>(Types.CLAIM_SOLICITUDE_FAILURE),

  postClaimSolicitude: createAction<any>(Types.POST_CLAIM_SOLICITUDE),
  postClaimSolicitudeLoading: createAction(Types.POST_CLAIM_SOLICITUDE_LOADING),
  postClaimSolicitudeSuccess: createAction<any>(Types.POST_CLAIM_SOLICITUDE_SUCCESS),
  postClaimSolicitudeFailure: createAction<ErrorObject>(Types.POST_CLAIM_SOLICITUDE_FAILURE),
}

export { Types };
export default Creators;