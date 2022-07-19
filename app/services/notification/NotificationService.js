import { BaseApi } from '../BaseApi';

const listNotificationUrl = (citizen_id) => `/api/notification/${citizen_id}`;

const getNotificationList = request =>
  BaseApi.get(listNotificationUrl(request?.citizen_id), {});

const postNotificationRead = request =>
  BaseApi.post(listNotificationUrl(request?.citizen_id), request.body);

export default {
  getNotificationList,
  postNotificationRead
};