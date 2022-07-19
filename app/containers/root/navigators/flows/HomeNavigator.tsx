import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {ClaimResponseItem} from '../../../../services/claim/ClaimServiceConstants';
import Chat from '../../../chat/Chat';
import ClaimDetail from '../../../claim/detail/ClaimDetail';
import ClaimList from '../../../claim/list/ClaimList';
import ClaimSolicitude from '../../../claim/solicitude/ClaimSolicitude';
import DocumentDetail from '../../../document/detail/DocumentDetail';
import DocumentSent from '../../../document/sent/DocumentSent';
import PaymentDetail from '../../../payment/detail/PaymentDetail';
import PaymentForm from '../../../payment/form/PaymentForm';
import PaymentList from '../../../payment/list/PaymentList';
import PaymentSirite from '../../../payment/sirite/PaymentSirite';
import RatingSolicitude from '../../../rating/solicitude/RatingSolicitude';
import RequestDetail from '../../../request/detail/RequestDetail';
import RequestList from '../../../request/list/RequestList';
import RequestResolve from '../../../request/resolve/RequestResolve';
import Notification from '../../../notification/Notification';
import {BottomTabNavigatorParamList} from '../BottomTabNavigator';

const Stack = createStackNavigator<HomeNavigatorParamList>();
const MyServices = () => {
  //Rendering
  return (
    <Stack.Navigator
      initialRouteName="RequestList"
      screenOptions={{headerShown: false}}>
      {/* Request */}
      <Stack.Screen name="RequestList" component={RequestList} />
      <Stack.Screen name="RequestDetail" component={RequestDetail} />
      <Stack.Screen name="RequestResolve" component={RequestResolve} />

      {/* Document */}
      <Stack.Screen name="DocumentSent" component={DocumentSent} />
      <Stack.Screen name="DocumentDetail" component={DocumentDetail} />

      {/* Claims */}
      <Stack.Screen name="ClaimList" component={ClaimList} />
      <Stack.Screen name="ClaimSolicitude" component={ClaimSolicitude} />
      <Stack.Screen name="ClaimDetail" component={ClaimDetail} />

      {/* Payments */}
      <Stack.Screen name="PaymentList" component={PaymentList} />
      <Stack.Screen name="PaymentDetail" component={PaymentDetail} />
      <Stack.Screen
        name="PaymentForm"
        component={PaymentForm}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name="PaymentSirite"
        component={PaymentSirite}
        options={{gestureEnabled: false}}
      />

      {/* Chat */}
      <Stack.Screen name="Chat" component={Chat} />

      {/* Rating */}
      <Stack.Screen name="RatingSolicitude" component={RatingSolicitude} />
      {/* notificacion */}
      <Stack.Screen name="Notifications" component={Notification} />
    </Stack.Navigator>
  );
};

export type HomeNavigatorParamList = BottomTabNavigatorParamList & {
  Notification?: any;
  NotificationItem?: any;
  RequestList?: any;
  RequestDetail?: {
    id?: number;
  };
  PaymentList?: any;
  PaymentDetail?: any;
  ClaimList?: any;
  ClaimDetail?: ClaimResponseItem;
  ClaimSolicitude?: any;
  RatingSolicitude?: any;
  DocumentSent?: any;
  RequestResolve?: any;
  Chat?: any;
};

export default MyServices;
