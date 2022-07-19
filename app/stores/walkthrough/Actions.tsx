import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../StoreConstants';

const Types = {
  GET_WALKTHROUGH: 'GET_WALKTHROUGH',
  WALKTHROUGH_LOADING: 'WALKTHROUGH_LOADING',
  WALKTHROUGH_SUCCESS: 'WALKTHROUGH_SUCCESS',
  WALKTHROUGH_FAILURE: 'WALKTHROUGH_FAILURE',
}

const Creators = {
  getWalkthrough: createAction(Types.GET_WALKTHROUGH),
  walkthroughLoading: createAction(Types.WALKTHROUGH_LOADING),
  walkthroughSuccess: createAction<any>(Types.WALKTHROUGH_SUCCESS),
  walkthroughFailure: createAction<ErrorObject>(Types.WALKTHROUGH_FAILURE),
}

export { Types };
export default Creators;