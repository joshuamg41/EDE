export interface SigninRequest {
  citizen_id?: string;
  password?: string;
}

export interface SigninResponse {
  success?: boolean;
  msg?: string;
  payload?: {
    token?: string;
    expiration_time?: number;
    profile_img?: string;
  }
}

export interface GetUserDataRequest {

}

export interface GetUserDataResponse {
  success: boolean;
  msg: string;
  payload: {
    name: string;
    first_last_name: string;
    second_last_name: string;
    citizen_id: string;
    birth_date: string;
    birth_place: string;
    age: number;
    sex: string;
    phone: string;
    email: string;
    address: string;
    email2: string;
    phone2: string;
    municipality: string;
    municipality_id: string;
    province: string;
    province_id: string;
    sector: string;
    sector_id: string;
    marital_status: string;
    children: null;
    sms: string;
    vulnerable_groups: [];
    last_update: [];
  }
}

export interface SendResetPasswordRequest {

}

export interface SendResetPasswordResponse {
  success: boolean;
  msg: string;
  payload: {
    success: boolean;
    msg: string;
    payload: null;
  }
}