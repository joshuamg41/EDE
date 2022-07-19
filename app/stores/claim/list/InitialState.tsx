import { ErrorObject } from "../../StoreConstants";

export interface ClaimListInitialState {
  getData: any[];
  getLoading: boolean;
  getError: ErrorObject;
}

export default {
  getData: [],
  getLoading: false,
  getError: null,
} as ClaimListInitialState;