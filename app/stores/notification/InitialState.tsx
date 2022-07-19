import { NotificationListItem } from "../../services/notification/NotificationServiceConstants";
import { ErrorObject } from "../StoreConstants";

export interface NotificationInitialState {
  getData: NotificationListItem[];
  getLoading: boolean;
  getError: ErrorObject;

  postData: {};
  postLoading: boolean;
  postError: ErrorObject;
}

export default {
  getData: [],
  getLoading: false,
  getError: null,

  postData: {},
  postLoading: false,
  postError: null,
} as NotificationInitialState;
