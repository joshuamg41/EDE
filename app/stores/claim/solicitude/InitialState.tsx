import { PostClaimResponse } from "../../../services/claim/ClaimServiceConstants";
import { ErrorObject } from "../../StoreConstants";
import { IModalListInDto } from 'react-native-picker-modal-view/dist/Interfaces';

export interface ClaimSolicitudeInitialState {
  getData: {
    issueList: IModalListInDto[];
  };
  getLoading: boolean;
  getError: ErrorObject;

  postData: PostClaimResponse;
  postLoading: boolean;
  postError: ErrorObject;
}

export default {
  getData: {
    issueList: [],
  },
  getLoading: false,
  getError: null,

  postData: {},
  postLoading: false,
  postError: null,
} as ClaimSolicitudeInitialState;
