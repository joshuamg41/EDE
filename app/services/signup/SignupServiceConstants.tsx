export interface SignupRequest {
  citizen_id?: string;
  document_type?: string;
  email?: string;
  name?: string;
  first_last_name?: string;
  second_last_name?: string;
  occupation?: string;
  password?: string;
  password_confirmation?: string;
  province_id?: string | object;
  municipality_id?: string | object;
  sector_id?: string | object;
  phone?: string;
  phone2?: string;
  address?: string;
}

export interface SignupResponse {

}

export interface ValidateDocumentRequest {
  citizen_id?: string;
}

export interface ValidateDocumentResponse {
  success: boolean | null;
  exist: boolean | null;
}

export interface SignupSecurityQuestionRequest { }

export interface SignupSecurityQuestionResponse {
  id?: number;
  question?: string;
}[]