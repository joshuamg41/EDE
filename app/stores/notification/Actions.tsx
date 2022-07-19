import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../StoreConstants';

const Types = {
  GET_NOTIFICATION: 'GET_NOTIFICATION',
  NOTIFICATION_LOADING: 'NOTIFICATION_LOADING',
  NOTIFICATION_SUCCESS: 'NOTIFICATION_SUCCESS',
  NOTIFICATION_FAILURE: 'NOTIFICATION_FAILURE',

  POST_NOTIFICATION_READ: 'POST_NOTIFICATION_READ',
  NOTIFICATION_READ_LOADING: 'NOTIFICATION_READ_LOADING',
  NOTIFICATION_READ_SUCCESS: 'NOTIFICATION_READ_SUCCESS',
  NOTIFICATION_READ_FAILURE: 'NOTIFICATION_READ_FAILURE',
}

const Creators = {
  getNotification: createAction<any>(Types.GET_NOTIFICATION),
  notificationLoading: createAction(Types.NOTIFICATION_LOADING),
  notificationSuccess: createAction<any>(Types.NOTIFICATION_SUCCESS),
  notificationFailure: createAction<ErrorObject>(Types.NOTIFICATION_FAILURE),

  postNotificationRead: createAction<any>(Types.POST_NOTIFICATION_READ),
  notificationReadLoading: createAction(Types.NOTIFICATION_READ_LOADING),
  notificationReadSuccess: createAction<any>(Types.NOTIFICATION_READ_SUCCESS),
  notificationReadFailure: createAction<ErrorObject>(Types.NOTIFICATION_READ_FAILURE),
}

export { Types };
export default Creators;