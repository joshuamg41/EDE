import { SendResetPasswordResponse } from '../../services/signin/SigninServiceConstants';
import { ErrorObject } from '../StoreConstants';

export interface UserPropType {
  data?: {
    name?: string;
    first_last_name?: string;
    second_last_name?: string;
    citizen_id?: string;
    birth_date?: string;
    birth_place?: string;
    age?: number;
    sex?: string;
    phone?: string;
    email?: string;
    address?: string;
    email2?: null | string;
    phone2?: string;
    municipality?: string;
    municipality_id?: string;
    province?: string;
    province_id?: string;
    sector?: string;
    sector_id?: string;
    marital_status?: string;
    children?: null | string;
    sms?: string;
    vulnerable_groups?: any[];
    last_update?: any[];
    profile_img?: string;
  },
  pin?: string;
  token?: string;
  isLogged: boolean;
  authRequest?: {
    citizen_id?: string;
    password?: string;
  };
}

export interface SigninInitialState {
  user: UserPropType;
  isLoading: boolean;
  error: ErrorObject;

  passwordData: {
    ok?: boolean;
    message?: string;
    user_mail?: string;
  },
  passwordLoading: boolean;
  passwordError: ErrorObject;

  forgotData: SendResetPasswordResponse;
  forgotLoading: boolean;
  forgotError: ErrorObject;
}

export default {
  user: {
    data: {},
    token: undefined,
    isLogged: false,
    authRequest: undefined,
  },
  isLoading: false,
  error: null,

  passwordData: {},
  passwordLoading: false,
  passwordError: null,

  forgotData: {},
  forgotLoading: false,
  forgotError: null,
} as SigninInitialState;