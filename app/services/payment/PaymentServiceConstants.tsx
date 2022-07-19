export interface PaymentStatusRequest {
  idAutorizacionPortal?: string;
}

export interface PaymentStatusResponse {
  id?: string;
  message?: string;
  data?: {};
}