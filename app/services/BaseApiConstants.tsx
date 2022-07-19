import { ApiErrorResponse as ApiSauceErrorResponse, ApiOkResponse } from 'apisauce';

export interface ErrorResponse {
  code: string | number;
  message: string;
}

//Base api Types
type ApiErrorResponse = Omit<ApiSauceErrorResponse<ErrorResponse>, 'problem'> & {
  problem: ErrorResponse,
}

export type ApiResponse<T> = ApiErrorResponse | ApiOkResponse<T>

export type GenericApiResponse = { [key: string]: any } & {
  ok: boolean;
  msg?: string;
  error?: string;
}

//Firebase Types
interface GoogleErrorResponse<U> {
  code: string,
  success: boolean,
  fail: boolean,
  data?: U,
  error: ErrorResponse,
}

interface GoogleOkResponse<T> {
  code: string,
  success: boolean,
  fail: boolean,
  data?: T,
  error: null,
}

export type GoogleResponse<T, U = T> = GoogleErrorResponse<U> | GoogleOkResponse<T>