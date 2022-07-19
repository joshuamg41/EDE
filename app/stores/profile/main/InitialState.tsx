import { ProfileBusinessItem, ProfileBusinessResponse } from "../../../services/profile/ProfileServiceConstants";
import { ErrorObject } from "../../StoreConstants";

export interface ProfileInitialState {
  getData: {
    business: ProfileBusinessItem[];
  };
  getLoading: boolean;
  getError: ErrorObject;

  newPasswordData: {
    date?: number;
    message?: string;
    success?: boolean;
  };
  newPasswordLoading: boolean;
  newPasswordError: ErrorObject;

  newEmailData: {
    date?: number;
    message?: string;
    success?: boolean;
  };
  newEmailLoading: boolean;
  newEmailError: ErrorObject;

  newCompanyData: {
    date?: number;
    message?: string;
    success?: boolean;
  };
  newCompanyLoading: boolean;
  newCompanyError: ErrorObject;
}

export default {
  getData: {
    business: [],
  },
  getLoading: false,
  getError: null,

  newPasswordData: {},
  newPasswordLoading: false,
  newPasswordError: null,

  newEmailData: {},
  newEmailLoading: false,
  newEmailError: null,

  newCompanyData: {},
  newCompanyLoading: false,
  newCompanyError: null,
} as ProfileInitialState;
