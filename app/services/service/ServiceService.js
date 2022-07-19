import Config from 'react-native-config';
import RNFetchBlob from 'react-native-blob-util';
import {BaseApi, FileApi} from '../BaseApi';

const listServiceUrl = '/api/services';
const detailServiceUrl = '/api/services/';
const solicitudeServiceUrl = request =>
  `/api/expertform/${request.id}/get/${request.citizen_id}`;
const postSolicitudeServiceUrl = '/api/requests';
const fileUploadUrl = '/api/files';
const associateSoftexpertUrl = '/api/uploadsoftexpert';
const associateBackofficeUrl = requestID => `/api/assigndocument/${requestID}`;
const formSaveUrl = `/api/drafts`;
const mimarenaUrl = request =>
  `/api/mimarena/validate/${request.invoiceNumber}`;
const dppUrl = request =>
  `/api/dpp/validate/${request.code}?tipo=${request.type}`;

const getServiceList = request => BaseApi.get(listServiceUrl, request);

const getServiceDetail = request =>
  BaseApi.get(detailServiceUrl + request?.head?.id, request.body);

const getServiceSolicitude = request =>
  BaseApi.get(solicitudeServiceUrl(request), {});

const postServiceSolicitude = request =>
  BaseApi.post(postSolicitudeServiceUrl, request);

const uploadFile = request => {
  return RNFetchBlob.fetch(
    'POST',
    Config.FILE_URL + fileUploadUrl,
    {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      'X-Authorization': Config.FILE_AUTHORIZATION,
    },
    request,
  )
    .then(resp => {
      const data = JSON.parse(resp.data);
      const result = {
        code: 200,
        success: true,
        fail: false,
        data: data,
        error: null,
      };
      console.log(result);
      return result;
    })
    .catch(error => {
      const result = {
        code: 200,
        success: true,
        fail: false,
        data: error,
        error: null,
      };
      console.log(result);
      return result;
    });
};

const associateFileSoftexpert = request =>
  FileApi.post(associateSoftexpertUrl, request);

const associateFileBackoffice = request =>
  BaseApi.post(associateBackofficeUrl(request?.requestID), request?.body);

const saveForm = request => BaseApi.post(formSaveUrl, request);

const getMimarenaValidation = request => BaseApi.get(mimarenaUrl(request), {});

const getDppValidation = request => BaseApi.get(dppUrl(request), {});

export default {
  getServiceList,
  getServiceDetail,
  getServiceSolicitude,
  postServiceSolicitude,
  uploadFile,
  associateFileSoftexpert,
  associateFileBackoffice,
  saveForm,
  getMimarenaValidation,
  getDppValidation,
};
