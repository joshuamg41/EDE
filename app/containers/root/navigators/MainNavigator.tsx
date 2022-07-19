import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import Example from '../../example/Example';
import FaceId from '../../user-access/face-id/FaceId';
import ForgotPassword from '../../user-access/forgot-password/ForgotPassword';
import Pin from '../../user-access/pin/Pin';
import Signin from '../../user-access/signin/Signin';
import Signup from '../../user-access/signup/Signup';
import Walkthrough from '../../user-access/walkthrough/Walkthrough';
import Welcome from '../../user-access/welcome/Welcome';
import SplashScreen from '../splash-screen/SplashScreen';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator<MainNavigatorParamList>();
const MainStackNavigator = () => {
  //Rendering
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Example" component={Example} />
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />

      {/* flow stack */}
      <Stack.Screen name="Pin" component={Pin} />
      <Stack.Screen name="FaceId" component={FaceId} />
      <Stack.Screen name="Walkthrough" component={Walkthrough} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export type MainNavigatorParamList = {
  Walkthrough?: any;
  Welcome?: {
    comeFrom?: "ForgotPassword";
  };
  Signin?: any;
  FaceId?: {
    touchSupported?: boolean;
    from?: string;
  };
  Pin?: {
    touchSupported?: boolean;
    from?: string;
  };
  Signup?: any;
  ForgotPassword?: any;
  Example?: any;
  SplashScreen?: {
    from?: string;
  };
  DrawerNavigator?: any;
  BottomTabNavigator?: any;
}

export default MainStackNavigator