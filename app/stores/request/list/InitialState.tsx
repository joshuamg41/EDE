import { RequestListResponse, UserStatisticResponse } from "../../../services/request/RequestServiceConstants";
import { ErrorObject } from "../../StoreConstants";

export interface RequestListInitialState {
  getData: RequestListResponse;
  getLoading: boolean;
  getError: ErrorObject;

  moreData: RequestListResponse;
  moreLoading: boolean;
  moreError: ErrorObject;

  statisticData: UserStatisticResponse;
  statisticLoading: boolean;
  statisticError: ErrorObject;
}

export default {
  getData: {
    data: []
  },
  getLoading: false,
  getError: null,

  moreData: {
    data: []
  },
  moreLoading: false,
  moreError: null,

  statisticData: {
    reqsOpen: 0,
    reqsComplete: 0,
    documents: 0,
    reqsRejected: 0,
  },
  statisticLoading: false,
  statisticError: null,
} as RequestListInitialState;
