import { BaseApi } from '../BaseApi';

const listRatingUrl = (request) => `/api/services/extras/${request.service_id}/rating`;
const ratingPostUrl = '/api/services/extras/rating';

const getRatingList = request =>
  BaseApi.get(listRatingUrl(request?.header), request?.body);

const postRating = request =>
  BaseApi.post(ratingPostUrl, request);

export default {
  getRatingList,
  postRating,
};