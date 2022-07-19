import { ClaimResponseItem } from "../../../services/claim/ClaimServiceConstants";
import { ErrorObject } from "../../StoreConstants";

export interface ClaimDetailInitialState {
  getData: ClaimResponseItem;
  getLoading: boolean;
  getError: ErrorObject;
}

export default {
  getData: {},
  getLoading: false,
  getError: null,
} as ClaimDetailInitialState;
