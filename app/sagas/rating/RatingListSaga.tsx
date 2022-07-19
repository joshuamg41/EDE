import { call, delay, put, select, takeLatest, takeLeading } from 'redux-saga/effects';
import { ApiResponse } from '../../services/BaseApiConstants';
import RatingService from '../../services/rating/RatingService';
import { RatingListResponse } from '../../services/rating/RatingServiceConstants';
import ResponseCode from '../../services/ResponseCode';
import { RootState } from '../../stores/AppReducers';
import RatingListActions, { Types as RatingListTypes } from '../../stores/rating/list/Actions';
import { localToArray } from '../../utils/ArrayUtil';

function* getRatingList(request: any) {
  yield put(RatingListActions.ratingListLoading());

  const response: ApiResponse<RatingListResponse> = yield call(RatingService.getRatingList, request.payload);

  if (!response) {
    yield put(RatingListActions.ratingListFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(RatingListActions.ratingListFailure(response.problem));
    return
  }

  const result = {
    ...response.data,
    data: localToArray(response.data?.data).map(item => {
      return {
        ...item,
        key: String(item.id),
      }
    })
  }

  yield put(RatingListActions.ratingListSuccess(result));
}

function* getMoreRating(request: any) {
  yield put(RatingListActions.moreRatingLoading());

  const response: ApiResponse<RatingListResponse> = yield call(RatingService.getRatingList, request.payload);

  if (!response || !response.data) {
    yield delay(30000)
    yield put(RatingListActions.moreRatingFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield delay(30000)
    yield put(RatingListActions.moreRatingFailure(response.problem));
    return
  }

  const getData: RatingListResponse = yield select((state: RootState) => state.ratingList.getData)

  const result = {
    ...response.data,
    data: [
      ...getData.data,
      ...response.data.data.map(item => {
        return {
          ...item,
          key: String(item.id),
        }
      })
    ]
  }
  yield put(RatingListActions.moreRatingSuccess({
    date: Number(new Date())
  }));
  yield put(RatingListActions.ratingListSuccess(result));
}

export default [
  takeLatest(RatingListTypes.GET_RATING_LIST, getRatingList),
  takeLeading(RatingListTypes.GET_MORE_RATING, getMoreRating),
]