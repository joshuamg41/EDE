import { RequestDetailResponse } from "../../../services/request/RequestServiceConstants";
import { ErrorObject } from "../../StoreConstants";

export interface RequestDetailInitialState {
  getData: RequestDetailResponse;
  getLoading: boolean;
  getError: ErrorObject;
}

export default {
  getData: {},
  getLoading: false,
  getError: null,
} as RequestDetailInitialState;
