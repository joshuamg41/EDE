import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../../StoreConstants';

const Types = {
  GET_SERVICE_SOLICITUDE: 'GET_SERVICE_SOLICITUDE',
  SERVICE_SOLICITUDE_LOADING: 'SERVICE_SOLICITUDE_LOADING',
  SERVICE_SOLICITUDE_SUCCESS: 'SERVICE_SOLICITUDE_SUCCESS',
  SERVICE_SOLICITUDE_FAILURE: 'SERVICE_SOLICITUDE_FAILURE',

  POST_SERVICE_SOLICITUDE: 'POST_SERVICE_SOLICITUDE',
  POST_SERVICE_SOLICITUDE_LOADING: 'POST_SERVICE_SOLICITUDE_LOADING',
  POST_SERVICE_SOLICITUDE_SUCCESS: 'POST_SERVICE_SOLICITUDE_SUCCESS',
  POST_SERVICE_SOLICITUDE_FAILURE: 'POST_SERVICE_SOLICITUDE_FAILURE',

  SAVE_SERVICE_SOLICITUDE: 'SAVE_SERVICE_SOLICITUDE',
  SAVE_SERVICE_SOLICITUDE_LOADING: 'SAVE_SERVICE_SOLICITUDE_LOADING',
  SAVE_SERVICE_SOLICITUDE_SUCCESS: 'SAVE_SERVICE_SOLICITUDE_SUCCESS',
  SAVE_SERVICE_SOLICITUDE_FAILURE: 'SAVE_SERVICE_SOLICITUDE_FAILURE',

  GET_MIMARENA_VALIDATE: 'GET_MIMARENA_VALIDATE',
  MIMARENA_VALIDATE_LOADING: 'MIMARENA_VALIDATE_LOADING',
  MIMARENA_VALIDATE_SUCCESS: 'MIMARENA_VALIDATE_SUCCESS',
  MIMARENA_VALIDATE_FAILURE: 'MIMARENA_VALIDATE_FAILURE',

  GET_DPP_VALIDATE: 'GET_DPP_VALIDATE',
  DPP_VALIDATE_LOADING: 'DPP_VALIDATE_LOADING',
  DPP_VALIDATE_SUCCESS: 'DPP_VALIDATE_SUCCESS',
  DPP_VALIDATE_FAILURE: 'DPP_VALIDATE_FAILURE',
}

const Creators = {
  getServiceSolicitude: createAction<any>(Types.GET_SERVICE_SOLICITUDE),
  serviceSolicitudeLoading: createAction(Types.SERVICE_SOLICITUDE_LOADING),
  serviceSolicitudeSuccess: createAction<any>(Types.SERVICE_SOLICITUDE_SUCCESS),
  serviceSolicitudeFailure: createAction<ErrorObject>(Types.SERVICE_SOLICITUDE_FAILURE),

  postServiceSolicitude: createAction<any>(Types.POST_SERVICE_SOLICITUDE),
  postServiceSolicitudeLoading: createAction(Types.POST_SERVICE_SOLICITUDE_LOADING),
  postServiceSolicitudeSuccess: createAction<any>(Types.POST_SERVICE_SOLICITUDE_SUCCESS),
  postServiceSolicitudeFailure: createAction<ErrorObject>(Types.POST_SERVICE_SOLICITUDE_FAILURE),

  saveServiceSolicitude: createAction<any>(Types.SAVE_SERVICE_SOLICITUDE),
  saveServiceSolicitudeLoading: createAction(Types.SAVE_SERVICE_SOLICITUDE_LOADING),
  saveServiceSolicitudeSuccess: createAction<any>(Types.SAVE_SERVICE_SOLICITUDE_SUCCESS),
  saveServiceSolicitudeFailure: createAction<ErrorObject>(Types.SAVE_SERVICE_SOLICITUDE_FAILURE),
  
  getMimarenaValidate: createAction<any>(Types.GET_MIMARENA_VALIDATE),
  mimarenaValidateLoading: createAction<any>(Types.MIMARENA_VALIDATE_LOADING),
  mimarenaValidateSuccess: createAction<any>(Types.MIMARENA_VALIDATE_SUCCESS),
  mimarenaValidateFailure: createAction<ErrorObject>(Types.MIMARENA_VALIDATE_FAILURE),

  getDppValidate: createAction<any>(Types.GET_DPP_VALIDATE),
  dppValidateLoading: createAction<any>(Types.DPP_VALIDATE_LOADING),
  dppValidateSuccess: createAction<any>(Types.DPP_VALIDATE_SUCCESS),
  dppValidateFailure: createAction<ErrorObject>(Types.DPP_VALIDATE_FAILURE),
}

export { Types };
export default Creators;