import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import DraftList from '../../../draft/list/DraftList';
import PaymentForm from '../../../payment/form/PaymentForm';
import PaymentSirite from '../../../payment/sirite/PaymentSirite';
import ServiceDetail from '../../../service/detail/ServiceDetail';
import RenderService from '../../../service/list/components/RenderService';
import ServiceList from '../../../service/list/ServiceList';
import ServiceSolicitude from '../../../service/solicitude/ServiceSolicitude';
import { BottomTabNavigatorParamList } from '../BottomTabNavigator';
import { ServiceNavigatorParamList } from './ServiceNavigator';

const Stack = createStackNavigator<DraftNavigatorParamList>();
const DraftNavigator = () => {
  //Rendering
  return (
    <Stack.Navigator
      initialRouteName="DraftList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="DraftList" component={DraftList} />
      <Stack.Screen name="ServiceList" component={ServiceList} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
      <Stack.Screen name="ServiceSolicitude" component={ServiceSolicitude} options={{ gestureEnabled: false }} />
      <Stack.Screen name="ServiceListItem" component={RenderService} />
      <Stack.Screen name="PaymentForm" component={PaymentForm} options={{ gestureEnabled: false }} />
      <Stack.Screen name="PaymentSirite" component={PaymentSirite} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  );
};

export type DraftNavigatorParamList = BottomTabNavigatorParamList & ServiceNavigatorParamList & {
  DraftList?: any;
}

export default DraftNavigator