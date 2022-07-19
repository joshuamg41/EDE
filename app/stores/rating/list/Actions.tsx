import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../../StoreConstants';

const Types = {
  GET_RATING_LIST: 'GET_RATING_LIST',
  RATING_LIST_LOADING: 'RATING_LIST_LOADING',
  RATING_LIST_SUCCESS: 'RATING_LIST_SUCCESS',
  RATING_LIST_FAILURE: 'RATING_LIST_FAILURE',

  GET_MORE_RATING: 'GET_MORE_RATING',
  MORE_RATING_LOADING: 'MORE_RATING_LOADING',
  MORE_RATING_SUCCESS: 'MORE_RATING_SUCCESS',
  MORE_RATING_FAILURE: 'MORE_RATING_FAILURE',
}

const Creators = {
  getRatingList: createAction<any>(Types.GET_RATING_LIST),
  ratingListLoading: createAction(Types.RATING_LIST_LOADING),
  ratingListSuccess: createAction<any>(Types.RATING_LIST_SUCCESS),
  ratingListFailure: createAction<ErrorObject>(Types.RATING_LIST_FAILURE),

  getMoreRating: createAction<any>(Types.GET_MORE_RATING),
  moreRatingLoading: createAction(Types.MORE_RATING_LOADING),
  moreRatingSuccess: createAction<any>(Types.MORE_RATING_SUCCESS),
  moreRatingFailure: createAction<ErrorObject>(Types.MORE_RATING_FAILURE),
}

export { Types };
export default Creators;