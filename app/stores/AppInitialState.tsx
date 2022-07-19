import ClaimDetailInitialState from './claim/detail/InitialState';
import ClaimListInitialState from './claim/list/InitialState';
import ClaimSolicitudeInitialState from './claim/solicitude/InitialState';
import DocumentListInitialState from './document/list/InitialState';
import DocumentSentInitialState from './document/sent/InitialState';
import ExampleInitialState from './example/InitialState';
import NotificationInitialState from './notification/InitialState';
import PaymentDetailInitialState from './payment/detail/InitialState';
import PaymentFormInitialState from './payment/form/InitialState';
import PaymentListInitialState from './payment/list/InitialState';
import ProfileBusinessInitialState from './profile/business/InitialState';
import ProfileEditInitialState from './profile/edit/InitialState';
import ProfileMainInitialState from './profile/main/InitialState';
import RequestDetailInitialState from './request/detail/InitialState';
import RequestListInitialState from './request/list/InitialState';
import RequestResolveInitialState from './request/resolve/InitialState';
import ServiceDetailInitialState from './service/detail/InitialState';
import ServiceListInitialState from './service/list/InitialState';
import ServiceSolicitudeInitialState from './service/solicitude/InitialState';
import SigninInitialState from './signin/InitialState';
import SignupInitialState from './signup/InitialState';
import WalkthroughInitialState from './walkthrough/InitialState';
import DraftListInitialState from './draft/list/InitialState';
import PaymentSiriteInitialState from './payment/sirite/InitialState';
import RatingListInitialState from './rating/list/InitialState';
import RatingSolicitudeInitialState from './rating/solicitude/InitialState';

const AppInitialState = {
  example: ExampleInitialState,
  signin: SigninInitialState,
  signup: SignupInitialState,
  notification: NotificationInitialState,
  requestList: RequestListInitialState,
  requestDetail: RequestDetailInitialState,
  requestResolve: RequestResolveInitialState,
  serviceList: ServiceListInitialState,
  serviceDetail: ServiceDetailInitialState,
  serviceSolicitude: ServiceSolicitudeInitialState,
  profileMain: ProfileMainInitialState,
  profileEdit: ProfileEditInitialState,
  profileBusiness: ProfileBusinessInitialState,
  claimList: ClaimListInitialState,
  claimDetail: ClaimDetailInitialState,
  claimSolicitude: ClaimSolicitudeInitialState,
  paymentList: PaymentListInitialState,
  paymentDetail: PaymentDetailInitialState,
  paymentForm: PaymentFormInitialState,
  paymentSirite: PaymentSiriteInitialState,
  documentSent: DocumentSentInitialState,
  documentList: DocumentListInitialState,
  walkthrough: WalkthroughInitialState,
  draftList: DraftListInitialState,
  ratingList: RatingListInitialState,
  ratingSolicitude: RatingSolicitudeInitialState,
}

export default AppInitialState