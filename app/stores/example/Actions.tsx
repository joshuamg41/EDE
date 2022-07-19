import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../StoreConstants';

const Types = {
  EXAMPLE_PAYLOAD: 'EXAMPLE_PAYLOAD',
  EXAMPLE_LOADING: 'EXAMPLE_LOADING',
  EXAMPLE_SUCCESS: 'EXAMPLE_SUCCESS',
  EXAMPLE_FAILURE: 'EXAMPLE_FAILURE',
}

const Creators = {
  examplePayload: createAction<any>(Types.EXAMPLE_PAYLOAD),
  exampleLoading: createAction(Types.EXAMPLE_LOADING),
  exampleSuccess: createAction<any>(Types.EXAMPLE_SUCCESS),
  exampleFailure: createAction<ErrorObject>(Types.EXAMPLE_FAILURE),
}

export { Types };
export default Creators;