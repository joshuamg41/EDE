import { ErrorObject } from "../../StoreConstants";

export interface PaymentFormInitialState {
  payData: any;
  payLoading: boolean;
  payError: ErrorObject;

  postData: any;
  postLoading: boolean;
  postError: ErrorObject;
}

export default {
  payData: {},
  payLoading: false,
  payError: null,

  postData: {},
  postLoading: false,
  postError: null,
} as PaymentFormInitialState;
