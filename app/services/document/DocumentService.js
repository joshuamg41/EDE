import RNFetchBlob from 'react-native-blob-util';
import { BaseApi } from '../BaseApi';

const listDocumentUrl = (request) => `/api/citizens/documentsPage/${request?.citizen_id}/${request?.origin}`;

const getDocumentList = request =>
  BaseApi.get(listDocumentUrl(request), request?.body);

const getFile = request =>
  RNFetchBlob.fetch('GET', request, {
  })
    .then(resp => {
      let base64Str = resp.base64()
      const result = {
        code: 200,
        success: true,
        fail: false,
        data: base64Str,
        error: null,
      }
      console.log(result)
      return result
    })
    .catch(error => {
      const result = {
        code: 200,
        success: true,
        fail: false,
        data: error,
        error: null,
      }
      console.log(result)
      return result
    });

export default {
  getFile,
  getDocumentList,
};