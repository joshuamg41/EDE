import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import PaymentForm from '../../../payment/form/PaymentForm';
import PaymentSirite from '../../../payment/sirite/PaymentSirite';
import RatingList from '../../../rating/list/RatingList';
import ServiceDetail from '../../../service/detail/ServiceDetail';
import RenderService from '../../../service/list/components/RenderService';
import ServiceList from '../../../service/list/ServiceList';
import ServiceSolicitude from '../../../service/solicitude/ServiceSolicitude';
import { BottomTabNavigatorParamList } from '../BottomTabNavigator';

const Stack = createStackNavigator<ServiceNavigatorParamList>();
const ServiceNavigator = () => {
  //Rendering
  return (
    <Stack.Navigator
      initialRouteName="ServiceList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ServiceList" component={ServiceList} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
      <Stack.Screen name="ServiceSolicitude" component={ServiceSolicitude} options={{ gestureEnabled: false }} />
      <Stack.Screen name="ServiceListItem" component={RenderService} />
      <Stack.Screen name="PaymentForm" component={PaymentForm} />
      <Stack.Screen name="PaymentSirite" component={PaymentSirite} options={{ gestureEnabled: false }} />
      <Stack.Screen name="RatingList" component={RatingList} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  );
};

export type ServiceNavigatorParamList = BottomTabNavigatorParamList & {
  ServiceList?: any;
  ServiceDetail: {
    id: string | number;
  };
  ServiceListItem?: any;
  ServiceSolicitude?: {
    draft?: boolean;
  };
  RatingList?: any;
}

export default ServiceNavigator