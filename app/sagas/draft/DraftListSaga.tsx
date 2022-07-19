import { call, put, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from '../../services/BaseApiConstants';
import DraftService from '../../services/draft/DraftService';
import { DraftListResponse } from '../../services/draft/DraftServiceConstants';
import ResponseCode from '../../services/ResponseCode';
import DraftList, { Types as DraftListTypes } from '../../stores/draft/list/Actions';

function* getDraftList(request: any) {
  yield put(DraftList.draftListLoading());

  const response: ApiResponse<DraftListResponse> = yield call(DraftService.getDraftList, request.payload);

  if (!response || !response.data) {
    yield put(DraftList.draftListFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(DraftList.draftListFailure(response.problem));
    return
  }

  if (!Array.isArray(response.data.data)) {
    yield put(DraftList.draftListFailure(ResponseCode.SERVER_ERROR));
    return
  }

  const result = {
    ...response.data,
    data: response.data.data.map(item => {
      return {
        ...item,
        key: String(item.service.id),
      }
    })
  }

  yield put(DraftList.draftListSuccess(result));
}

// function* getMoreDraft(draft: any) {
//   yield put(DraftList.moreDraftLoading());

//   const response: ApiResponse<DraftListResponse> = yield call(DraftService.getSolicitudeList, draft.payload);

//   if (!response || !response.data) {
//     yield delay(30000)
//     yield put(DraftList.moreDraftFailure(ResponseCode.BAD_REQUEST));
//     return
//   }

//   if (response.problem) {
//     yield delay(30000)
//     yield put(DraftList.moreDraftFailure(response.problem));
//     return
//   }

//   const getData: DraftListResponse = yield select((state: RootState) => state.draftList.getData)

//   const result = {
//     ...response.data,
//     data: [
//       ...getData.data,
//       ...response.data.data.map(item => {
//         return {
//           ...item,
//           key: String(item.id),
//         }
//       })
//     ]
//   }
//   yield put(DraftList.moreDraftSuccess({
//     date: Number(new Date())
//   }));
//   yield put(DraftList.draftListSuccess(result));
// }

export default [
  takeLatest(DraftListTypes.GET_DRAFT_LIST, getDraftList),
  //   takeLeading(DraftListTypes.GET_MORE_REQUEST, getMoreDraft),
]