import { RatingListResponse } from "../../../services/rating/RatingServiceConstants";
import { ErrorObject } from "../../StoreConstants";

export interface RatingListInitialState {
  getData: RatingListResponse;
  getLoading: boolean;
  getError: ErrorObject;

  moreData: RatingListResponse;
  moreLoading: boolean;
  moreError: ErrorObject;
}

export default {
  getData: {},
  getLoading: false,
  getError: null,

  moreData: {},
  moreLoading: false,
  moreError: null,
} as RatingListInitialState;
