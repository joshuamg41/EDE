import { ErrorObject } from "../../StoreConstants";

export interface PaymentDetailInitialState {
  getData: any;
  getLoading: boolean;
  getError: ErrorObject;
}

export default {
  getData: {},
  getLoading: false,
  getError: null,
} as PaymentDetailInitialState;
