//@ts-nocheck
import { create } from 'apisauce';
import Config from 'react-native-config';
import OneSignal from 'react-native-onesignal';
import { RootState } from '../stores/AppReducers';
import { store } from '../stores/index';
import SigninActions from '../stores/signin/Actions';
import { localToString } from '../utils/StringUtil';
import { navigateAndReset } from './NavigationService';
import ResponseCode from './ResponseCode';

const BaseApi = create({
  baseURL: Config.BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Authorization': Config.AUTHORIZATION,
    'Cache-Control': 'no-cache'
  },
  timeout: Number(Config.TIMEOUT) || 60000,
});

const FileApi = create({
  baseURL: Config.FILE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Authorization': Config.FILE_AUTHORIZATION,
    'Cache-Control': 'no-cache'
  },
  timeout: Number(Config.TIMEOUT) || 60000,
});

const UniqueIdentityApi = create({
  baseURL: Config.UNIQUE_IDENTITY_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  },
  timeout: Number(Config.TIMEOUT) || 60000,
})

const WordPressApi = create({
  baseURL: Config.WORDPRESS_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  },
  timeout: Number(Config.TIMEOUT) || 60000,
})

const OneSignalApi = create({
  baseURL: Config.NOTIFICATION_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Basic ${Config.NOTIFICATION_AUTH}`,
  },
  timeout: Number(Config.TIMEOUT) || 60000,
})

function transformRequest(request) {
  console.log(request);
  const state = store?.getState();
  const token = state?.signin?.user?.token
  console.log("TOKEN", token)
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request
}

function transformResponse(response) {
  console.log(response);

  //State
  const state: RootState = store?.getState();
  const isLogged = state?.signin?.user?.isLogged
  const userData = state?.signin?.user?.data

  //Token receptor
  if (response?.data?.payload?.token) {
    console.log("NEW TOKEN", response?.data?.payload?.token)
    store.dispatch(SigninActions.refreshUserToken(response?.data?.payload?.token))
  }

  if (response.ok || response.problem === "CLIENT_ERROR") {
    if (response.data && response.data?.code == '500' && response.data.message) {
      response.problem = response.data;
    } else if (response.data && response.data?.code == '404' && response.data.message) {
      response.problem = response.data;
    } else if (response.status == 401 && isLogged) {
      navigateAndReset('Welcome')
    }
  } else if (ResponseCode[response.problem]) {
    response.problem = ResponseCode[response.problem]
  } else {
    response.problem = ResponseCode.CONNECTION_ERROR
  }
  return response
}

// Para probar, impirmir todos los request y response que se llamen
BaseApi.addRequestTransform(transformRequest);
UniqueIdentityApi.addRequestTransform(transformRequest);
WordPressApi.addRequestTransform(transformRequest);
FileApi.addRequestTransform(transformRequest);
OneSignalApi.addRequestTransform(transformRequest);

// Transformando el response para poner los errores generales
BaseApi.addResponseTransform(transformResponse);
UniqueIdentityApi.addResponseTransform(transformResponse);
WordPressApi.addResponseTransform(transformResponse);
FileApi.addResponseTransform(transformResponse);
OneSignalApi.addResponseTransform(transformResponse);

const baseApiResponseReturn = (response) => {
  return response
}

export {
  BaseApi,
  UniqueIdentityApi,
  WordPressApi,
  FileApi,
  OneSignalApi,
  baseApiResponseReturn,
};

