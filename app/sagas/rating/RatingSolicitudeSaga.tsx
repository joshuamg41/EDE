import { call, put, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from '../../services/BaseApiConstants';
import RatingService from '../../services/rating/RatingService';
import { PostRatingResponse } from '../../services/rating/RatingServiceConstants';
import ResponseCode from '../../services/ResponseCode';
import RatingSolicitudeActions, { Types as RatingSolicitudeTypes } from '../../stores/rating/solicitude/Actions';

function* postRating(request: any) {
  yield put(RatingSolicitudeActions.postRatingLoading());

  const response: ApiResponse<PostRatingResponse> = yield call(RatingService.postRating, request.payload);

  if (!response) {
    yield put(RatingSolicitudeActions.postRatingFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(RatingSolicitudeActions.postRatingFailure(response.problem));
    return
  }

  const result = {
    ...response.data,
    date: new Date(),
  }

  yield put(RatingSolicitudeActions.postRatingSuccess(result));
}

export default [
  takeLatest(RatingSolicitudeTypes.POST_RATING, postRating),
]