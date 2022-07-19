import { BaseApi } from '../BaseApi';

const listSolicitudeUrl = (document) => `/api/requests/extras/service/${document}`;
const detailSolicitudeUrl = (id) => `/api/requests/${id}`;
const resolveRequestUrl = '/api/requests/action/save';
const resolveTextUrl = '/api/comment';
const userStatisticUrl = (citizen_id) => `/api/statistics/${citizen_id}`;

const getSolicitudeList = request =>
  BaseApi.get(listSolicitudeUrl(request.document), request.body);

const getSolicitudeDetail = request =>
  BaseApi.get(detailSolicitudeUrl(request.id), request.body);

const postTextResolve = request =>
  BaseApi.post(resolveTextUrl, request);

const getStatisticUser = request =>
  BaseApi.get(userStatisticUrl(request.citizen_id), {});

export default {
  getSolicitudeList,
  getSolicitudeDetail,
  postTextResolve,
  getStatisticUser,
};