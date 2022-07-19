import { IModalListInDto } from "react-native-picker-modal-view/dist/Interfaces";
import { ValidateDocumentResponse } from "../../services/signup/SignupServiceConstants";
import { ErrorObject } from "../StoreConstants";

export interface SignupInitialState {
  signupData: {
    securityQuestion?: IModalListInDto[];
    provinceData?: IModalListInDto[];
  };
  signupLoading: boolean;
  signupError: ErrorObject;

  documentData: ValidateDocumentResponse & {
    payload: any;
  };
  documentLoading: false | {
    citizen_id?: string,
    fieldKey?: string,
  };
  documentError: ErrorObject;

  municipalityData: IModalListInDto[];
  municipalityLoading: boolean;
  municipalityError: ErrorObject;

  sectorData: IModalListInDto[];
  sectorLoading: boolean;
  sectorError: ErrorObject;

  postData: any;
  postLoading: boolean;
  postError: ErrorObject;
}

export default {
  signupData: {},
  signupLoading: false,
  signupError: null,

  documentData: {
    success: null,
    exist: null,
    payload: {},
  },
  documentLoading: false,
  documentError: null,

  municipalityData: [],
  municipalityLoading: false,
  municipalityError: null,

  sectorData: [],
  sectorLoading: false,
  sectorError: null,

  postData: {},
  postLoading: false,
  postError: null,
} as SignupInitialState;