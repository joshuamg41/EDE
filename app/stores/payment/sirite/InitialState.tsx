import { ErrorObject } from "../../StoreConstants";

export interface PaymentSiriteInitialState {
  updateData: any;
  updateLoading: boolean;
  updateError: ErrorObject;
}

export default {
  updateData: {},
  updateLoading: false,
  updateError: null,
} as PaymentSiriteInitialState;
