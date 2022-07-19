import { DocumentListResponse } from "../../../services/document/DocumentServiceConstants";
import { ErrorObject } from "../../StoreConstants";

export interface DocumentListInitialState {
  getData: {
    0: DocumentListResponse;
    1: DocumentListResponse;
  };
  getLoading: boolean;
  getError: ErrorObject;

  moreData: {
    0: DocumentListResponse;
    1: DocumentListResponse;
  };
  moreLoading: boolean;
  moreError: ErrorObject;

  query: string;
}

export default {
  getData: {
    0: {},
    1: {},
  },
  getLoading: false,
  getError: null,

  moreData: {
    0: {},
    1: {},
  },
  moreLoading: false,
  moreError: null,

  query: '',
} as DocumentListInitialState;
