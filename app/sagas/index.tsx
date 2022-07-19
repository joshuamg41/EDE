import { all, fork } from 'redux-saga/effects';
import ClaimListSaga from './claim/ClaimListSaga';
import ClaimSolicitudeSaga from './claim/ClaimSolicitudeSaga';
import DocumentListSaga from './document/DocumentListSaga';
import DraftListSaga from './draft/DraftListSaga';
import NotificationSaga from './NotificationSaga';
import PaymentSiriteSaga from './payment/PaymentSiriteSaga';
import ProfileBusinessSaga from './profile/ProfileBusinessSaga';
import ProfileEditSaga from './profile/ProfileEditSaga';
import ProfileMainSaga from './profile/ProfileMainSaga';
import RatingListSaga from './rating/RatingListSaga';
import RatingSolicitudeSaga from './rating/RatingSolicitudeSaga';
import RequestDetailSaga from './request/RequestDetailSaga';
import RequestListSaga from './request/RequestListSaga';
import RequestResolveSaga from './request/RequestResolveSaga';
import ServiceDetailSaga from './service/ServiceDetailSaga';
import ServiceListSaga from './service/ServiceListSaga';
import ServiceSolicitudeSaga from './service/ServiceSolicitudeSaga';
import SigninSaga from './SigninSaga';
import SignupSaga from './SignupSaga';
import startup from './StartupSaga';
import WalkthroughSaga from './WalkthroughSaga';

export default function* root() {
  yield fork(startup)
  yield all([
    //Access
    ...SigninSaga,
    ...SignupSaga,
    ...RequestListSaga,
    ...RequestDetailSaga,
    ...RequestResolveSaga,
    ...ServiceDetailSaga,
    ...ServiceListSaga,
    ...ServiceSolicitudeSaga,
    ...NotificationSaga,
    ...ProfileEditSaga,
    ...ProfileMainSaga,
    ...ProfileBusinessSaga,
    ...WalkthroughSaga,
    ...DocumentListSaga,
    ...DraftListSaga,
    ...PaymentSiriteSaga,
    ...ClaimSolicitudeSaga,
    ...ClaimListSaga,
    ...RatingSolicitudeSaga,
    ...RatingListSaga,
  ]);
}
