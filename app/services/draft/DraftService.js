import { BaseApi } from '../BaseApi';

const listDraftUrl = (request) => `/api/drafts/${request}`;

const getDraftList = request =>
  BaseApi.get(listDraftUrl(request));

export default {
  getDraftList,
};