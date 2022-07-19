import { WalkthroughResponse } from "../../services/walkthrough/WalkthroughServiceConstants";
import { ErrorObject } from "../StoreConstants";

export interface WalkthroughInitialState {
  getData: WalkthroughResponse;
  getLoading: boolean;
  getError: ErrorObject;
}

export default {
  getData: {},
  getLoading: false,
  getError: null,
} as WalkthroughInitialState;