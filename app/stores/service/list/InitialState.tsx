import { ServiceListResponse } from "../../../services/service/ServiceServiceConstants";
import { ErrorObject } from "../../StoreConstants";

export interface ServiceListInitialState {
  getData: ServiceListResponse[];
  getLoading: boolean;
  getError: ErrorObject;
  query: string;
}

export default {
  getData: [],
  getLoading: false,
  getError: null,

  query: '',
} as ServiceListInitialState;
