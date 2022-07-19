import { BaseApi, UniqueIdentityApi } from '../BaseApi';

const statusPaymentUrl = 'DoSomething';
const paymentUpdate = '/api/requests/extras/updatePaymentInfo'

const getPaymentStatus = request =>
  UniqueIdentityApi.get(statusPaymentUrl, request);

const postPaymentUpdate = request =>
  BaseApi.post(paymentUpdate, request);

export default {
  getPaymentStatus,
  postPaymentUpdate,
};