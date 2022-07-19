import { ErrorObject } from "../../StoreConstants";

export interface PaymentListInitialState {
  getData: any[];
  getLoading: boolean;
  getError: ErrorObject;
}

export default {
  getData: [],
  getLoading: false,
  getError: null,
} as PaymentListInitialState;