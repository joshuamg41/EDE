
import { UniqueIdentityApi, BaseApi } from "../BaseApi";

const userCreateUrl = '/api/auth/register/portal'
const provinceUrl = '/api/get/provinces'
const listQuestionUrl = '/api/auth/get/getquestionandanswer'
const municipalityUrl = '/api/get/municipalities'
const sectorUrl = '/api/get/sectors'
const sendQuestionUrl = '/api/auth/register/questionandanswer'
const documentValidateUrl = (id) => `/api/validate/${id}`

const createUser = request => {
  return UniqueIdentityApi.post(userCreateUrl, request)
}

const getProvince = request => {
  return UniqueIdentityApi.get(provinceUrl, request)
}

const getMunicipality = request => {
  return UniqueIdentityApi.get(`${municipalityUrl}/${request}`, {})
}

const getSector = request => {
  return UniqueIdentityApi.get(`${sectorUrl}/${request}`, {})
}

const getQuestionList = request => {
  return UniqueIdentityApi.get(listQuestionUrl, request)
}

const postSecurityQuestion = request => {
  return UniqueIdentityApi.post(sendQuestionUrl, request)
}

const getValidateDocument = request => {
  return BaseApi.get(documentValidateUrl(request?.citizen_id), {})
}

export default {
  createUser,
  getProvince,
  getMunicipality,
  getSector,
  getQuestionList,
  postSecurityQuestion,
  getValidateDocument,
};
