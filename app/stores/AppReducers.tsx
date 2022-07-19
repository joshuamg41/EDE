import { combineReducers } from '@reduxjs/toolkit';
import AppInitialState from './AppInitialState';
import { ClaimDetailReducer } from './claim/detail/Reducers';
import { ClaimListReducer } from './claim/list/Reducers';
import { ClaimSolicitudeReducer } from './claim/solicitude/Reducers';
import { DocumentListReducer } from './document/list/Reducers';
import { DocumentSentReducer } from './document/sent/Reducers';
import { DraftListReducer } from './draft/list/Reducers';
import { ExampleReducer } from './example/Reducers';
import { NotificationReducer } from './notification/Reducers';
import { PaymentDetailReducer } from './payment/detail/Reducers';
import { PaymentFormReducer } from './payment/form/Reducers';
import { PaymentListReducer } from './payment/list/Reducers';
import { PaymentSiriteReducer } from './payment/sirite/Reducers';
import { ProfileBusinessReducer } from './profile/business/Reducers';
import { ProfileEditReducer } from './profile/edit/Reducers';
import { ProfileMainReducer } from './profile/main/Reducers';
import { RatingListReducer } from './rating/list/Reducers';
import { RatingSolicitudeReducer } from './rating/solicitude/Reducers';
import { RequestDetailReducer } from './request/detail/Reducers';
import { RequestListReducer } from './request/list/Reducers';
import { RequestResolveReducer } from './request/resolve/Reducers';
import { ServiceDetailReducer } from './service/detail/Reducers';
import { ServiceListReducer } from './service/list/Reducers';
import { ServiceSolicitudeReducer } from './service/solicitude/Reducers';
import { Types as SigninTypes } from './signin/Actions';
import { SigninReducer } from './signin/Reducers';
import { SignupReducer } from './signup/Reducers';
import { WalkthroughReducer } from './walkthrough/Reducers';

const appReducer = combineReducers({
  //auth && miscellaneous
  example: ExampleReducer,
  signin: SigninReducer,
  signup: SignupReducer,

  //notification
  notification: NotificationReducer,

  //request
  requestList: RequestListReducer,
  requestDetail: RequestDetailReducer,
  requestResolve: RequestResolveReducer,

  //service
  serviceList: ServiceListReducer,
  serviceDetail: ServiceDetailReducer,
  serviceSolicitude: ServiceSolicitudeReducer,

  //profile
  profileMain: ProfileMainReducer,
  profileEdit: ProfileEditReducer,
  profileBusiness: ProfileBusinessReducer,

  //claim
  claimList: ClaimListReducer,
  claimDetail: ClaimDetailReducer,
  claimSolicitude: ClaimSolicitudeReducer,

  //payment
  paymentList: PaymentListReducer,
  paymentDetail: PaymentDetailReducer,
  paymentForm: PaymentFormReducer,
  paymentSirite: PaymentSiriteReducer,

  //documents
  documentSent: DocumentSentReducer,
  documentList: DocumentListReducer,

  //Walkthrough
  walkthrough: WalkthroughReducer,

  //Draft
  draftList: DraftListReducer,

  //Rating
  ratingList: RatingListReducer,
  ratingSolicitude: RatingSolicitudeReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === SigninTypes.LOGOUT_DESTROY_DATA) {
    state = AppInitialState
  }
  return (appReducer(state, action))
}

export type RootState = ReturnType<typeof appReducer>
export default rootReducer;