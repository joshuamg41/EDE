import { DraftListResponse } from "../../../services/draft/DraftServiceConstants";
import { ErrorObject } from "../../StoreConstants";

export interface DraftListInitialState {
  getData: DraftListResponse;
  getLoading: boolean;
  getError: ErrorObject;
}

export default {
  getData: {},
  getLoading: false,
  getError: null,
} as DraftListInitialState;