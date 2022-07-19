import { BaseApi } from '../BaseApi';

const listClaimUrl = (request) => `/api/claims/${request?.id}`;
const listIssueUrl = '/api/issues';
const claimPostUrl = '/api/claims';

const getClaimList = request =>
  BaseApi.get(listClaimUrl(request?.head), request?.body);

const getIssueList = request =>
  BaseApi.get(listIssueUrl, request);

const postClaim = request =>
  BaseApi.post(claimPostUrl, request);

export default {
  getClaimList,
  getIssueList,
  postClaim,
};