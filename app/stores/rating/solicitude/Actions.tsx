import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../../StoreConstants';

const Types = {
  POST_RATING: 'POST_RATING',
  POST_RATING_LOADING: 'POST_RATING_LOADING',
  POST_RATING_SUCCESS: 'POST_RATING_SUCCESS',
  POST_RATING_FAILURE: 'POST_RATING_FAILURE',
}

const Creators = {
  postRating: createAction<any>(Types.POST_RATING),
  postRatingLoading: createAction(Types.POST_RATING_LOADING),
  postRatingSuccess: createAction<any>(Types.POST_RATING_SUCCESS),
  postRatingFailure: createAction<ErrorObject>(Types.POST_RATING_FAILURE),
}

export { Types };
export default Creators;