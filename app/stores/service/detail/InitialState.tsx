import { ServiceDetailResponse } from "../../../services/service/ServiceServiceConstants";
import { ErrorObject } from "../../StoreConstants";

export interface ServiceDetailInitialState {
  getData: ServiceDetailResponse & {
    navigate?: string;
  };
  getLoading: boolean | string;
  getError: ErrorObject;

  servicePrice: any;
}

export default {
  getData: {},
  getLoading: false,
  getError: null,

  servicePrice: {},
} as ServiceDetailInitialState;
