import { UniqueIdentityApi } from '../BaseApi';

const passwordChangeUrl = '/api/citizen/change/password';
const emailChangeUrl = '/api/citizen/change/email';
const companyAddUrl = '/api/auth/register/createnewcompany';
const companyListUrl = '/api/auth/get/getallcompany';
const businessUpdateUrl = '/api/auth/update/updatecompany';

//ProfileEdit
const provinceUrl = '/api/get/provinces';
const municipalityUrl = '/api/get/municipalities';
const sectorUrl = '/api/get/sectors';
const citizenUpdateUrl = '/api/citizen-update';
const deleteUserUrl = '/api/users/destroy';

const changePassword = request =>
  UniqueIdentityApi.post(passwordChangeUrl, request);

const changeEmail = request =>
  UniqueIdentityApi.post(emailChangeUrl, request);

const addCompany = request =>
  UniqueIdentityApi.post(companyAddUrl, request);

const listCompany = request =>
  UniqueIdentityApi.get(companyListUrl, request);

const updateCompany = request =>
  UniqueIdentityApi.post(businessUpdateUrl, request);

//ProfileEdit
const getProvince = request =>
  UniqueIdentityApi.get(provinceUrl, request)

const getMunicipality = request =>
  UniqueIdentityApi.get(`${municipalityUrl}/${request}`, {})

const getSector = request =>
  UniqueIdentityApi.get(`${sectorUrl}/${request}`, {})

const updateCitizen = request =>
  UniqueIdentityApi.post(citizenUpdateUrl, request);

const userDelete = request =>
  UniqueIdentityApi.post(deleteUserUrl, request);

export default {
  listCompany,
  changePassword,
  changeEmail,
  addCompany,
  updateCompany,
  getProvince,
  getMunicipality,
  getSector,
  updateCitizen,
  userDelete,
};