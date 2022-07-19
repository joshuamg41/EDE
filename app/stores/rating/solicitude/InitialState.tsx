import { ErrorObject } from "../../StoreConstants";

export interface RatingSolicitudeInitialState {
  postData: {
    success?: boolean;
  };
  postLoading: boolean;
  postError: ErrorObject;
}

export default {
  postData: {},
  postLoading: false,
  postError: null,
} as RatingSolicitudeInitialState;
