import { call, put, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from '../services/BaseApiConstants';
import NotificationService from '../services/notification/NotificationService';
import { NotificationListResponse } from '../services/notification/NotificationServiceConstants';
import ResponseCode from '../services/ResponseCode';
import NotificationActions, { Types as NotificationTypes } from '../stores/notification/Actions';
import { localToArray } from '../utils/ArrayUtil';

function* getNotification(request: any) {
  yield put(NotificationActions.notificationLoading());

  const response: ApiResponse<NotificationListResponse> = yield call(NotificationService.getNotificationList, request.payload);

  if (!response) {
    yield put(NotificationActions.notificationFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(NotificationActions.notificationFailure(response.problem));
    return
  }

  const result = localToArray(response.data?.notifications).map((notification) => {
    return {
      ...notification,
      key: String(notification.notification_id),
    }
  })

  yield put(NotificationActions.notificationSuccess(result));
}

function* postNotificationRead(request: any) {
  yield put(NotificationActions.notificationReadLoading());

  const response: ApiResponse<NotificationListResponse> = yield call(NotificationService.postNotificationRead, request.payload);

  if (!response) {
    yield put(NotificationActions.notificationReadFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(NotificationActions.notificationReadFailure(response.problem));
    return
  }

  const result = {
    data: response.data,
    date: new Date(),
  }

  yield put(NotificationActions.notificationReadSuccess(result));
}

export default [
  takeLatest(NotificationTypes.GET_NOTIFICATION, getNotification),
  takeLatest(NotificationTypes.POST_NOTIFICATION_READ, postNotificationRead),
]