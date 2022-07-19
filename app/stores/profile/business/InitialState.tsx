import { ErrorObject } from "../../StoreConstants";

export interface ProfileBusinessInitialState {
  updateData: any;
  updateLoading: boolean;
  updateError: ErrorObject;
}

export default {
  updateData: {},
  updateLoading: false,
  updateError: null,
} as ProfileBusinessInitialState;
