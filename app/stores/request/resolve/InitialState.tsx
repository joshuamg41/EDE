import { RequestResolveResponse } from "../../../services/request/RequestServiceConstants";
import { ErrorObject } from "../../StoreConstants";

export interface RequestResolveInitialState {
  postData: RequestResolveResponse;
  postLoading: boolean;
  postError: ErrorObject;
}

export default {
  postData: {},
  postLoading: false,
  postError: null,
} as RequestResolveInitialState;