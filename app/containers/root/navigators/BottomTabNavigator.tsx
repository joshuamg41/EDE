import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Example from '../../example/Example';
import Notification from '../../notification/Notification';
import BottomTab from '../bottom-tab/BottomTab';
import DocumentNavigator from './flows/DocumentNavigator';
import DraftNavigator from './flows/DraftNavigator';
import MyServices from './flows/HomeNavigator';
import ProfileNavigator from './flows/ProfileNavigator';
import ServiceNavigator from './flows/ServiceNavigator';
import {MainNavigatorParamList} from './MainNavigator';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();
const BottomTabNavigator = () => {
  //Rendering
  return (
    <Tab.Navigator
      initialRouteName="HomeNavigator"
      screenOptions={{headerShown: false}}
      tabBar={BottomTab}
      backBehavior="history">
      <Tab.Screen name="HomeNavigator" component={DocumentNavigator} />
      <Tab.Screen name="Example" component={Example} />
      <Tab.Screen name="ServiceNavigator" component={ServiceNavigator} />
      <Tab.Screen name="ProfileNavigator" component={ProfileNavigator} />
      <Tab.Screen name="DocumentNavigator" component={MyServices} />
      {/* <Tab.Screen name="Notification" component={Notification} /> */}
      <Tab.Screen name="DraftNavigator" component={DraftNavigator} />
    </Tab.Navigator>
  );
};

export type BottomTabNavigatorParamList = MainNavigatorParamList & {
  HomeNavigator?: any;
  ServiceNavigator?: any;
  ProfileNavigator?: any;
  DocumentNavigator?: any;
  Notification?: any;
  PaymentForm?: {
    date?: string;
    businessName?: string;
    solicitudeId?: string;
    serviceName?: string;
    servicePrice?: string;
    authorizationId?: string;
    from?: string;
    paymentComplete?: boolean;
    recaudationCode?: string;
    siritCode?: string | null;
    externalPay?: number | null;
    requestId?: number;
  };
  PaymentSirite?: {
    servicePrice: string;
    authorizationId: string;
    recaudationCode: string;
    siritCode?: string | null;
    from?: string;
    requestId?: number;
  };
  DocumentDetail?: {
    id: number;
    document_id: number;
    name: string;
    extension: string;
    due_date: null;
    document_state: number;
    origin_doc: number;
    route: string;
    created_at: string;
    updated_at: string;
    url: string;
    pivot: {
      request_id: string;
      document_id: number;
    };
  };
  DraftNavigator?: any;
};

export default BottomTabNavigator;
