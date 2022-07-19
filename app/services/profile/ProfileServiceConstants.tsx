//BusinessList
export interface ProfileBusinessItem {
  id: number;
  company_name: string;
  company_address: string;
  company_rnc: string;
  company_phone: string;
  company_url_web: string;
  logo: string;
  applicant_name: string;
  citizen_id: string;
  citizen_unique_id: string;
  active: number;
  created_at: string;
  updated_at: string;
}

export interface ProfileBusinessRequest {

}

export interface ProfileBusinessResponse {
  success: boolean;
  msg: string;
  payload: [] | ProfileBusinessItem[];
}

//PasswordChange
export interface NewPasswordRequest {
  old_password: string;
  password: string;
}
export interface NewPasswordResponse {
  success: boolean;
  msg: {
    error: {
      [key: string]: string;
    }
    0: null | string;
    1: null | string;
  }
}

//EmailChange
export interface NewEmailRequest {
  email: string;
  password: string;
}
export interface NewEmailResponse {
  success: boolean;
  msg: any;
}

//EmailChange
export interface AddCompanyRequest {
  citizen_id: string;
  company_name: string;
  company_address: string;
  company_rnc: string;
  company_phone: string;
  company_url_web: string;
  logo: string;
  applicant_name: string;
  active: string;
}
export interface AddCompanyResponse {
  success: boolean;
  msg: string;
  error?: string;
}

//UpdateBusiness
export interface UpdateBusinessRequest {
  company_address?: string;
  company_rnc?: string;
  company_phone?: string;
  company_url_web?: string;
  logo?: string;
}
export interface UpdateBusinessResponse {
  success?: boolean;
  msg?: string | {
    error: string;
  };
}

//UpdateCitizen
export interface UpdateCitizenRequest {
  phone?: string;
  phone2?: string;
  province_id?: string;
  municipality_id?: string;
  sector_id?: string;
  address?: string;
}
export interface UpdateCitizenResponse {
  success?: boolean;
  msg?: any;
  payload?: any;
}