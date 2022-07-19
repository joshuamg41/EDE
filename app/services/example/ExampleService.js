import { BaseApi, baseApiResponseReturn } from '../BaseApi';

const getHistoryUrl = 'DoSomething';

const getHistory = request =>
  BaseApi.post(getHistoryUrl, request);

export default {
  getHistory,
};