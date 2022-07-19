import { ErrorObject } from "../StoreConstants";

export interface ExampleInitialState {
  getData: object;
  getLoading: boolean;
  getError: ErrorObject;
}

export default {
  getData: {},
  getLoading: false,
  getError: null,
} as ExampleInitialState;
