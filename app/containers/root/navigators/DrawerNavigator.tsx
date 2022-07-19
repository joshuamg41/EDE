import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { viewportWidth } from "../../../utils/StyleHelpers";
import DrawerMenu from "../drawer-menu/DrawerMenu";
import BottomTabNavigator from './BottomTabNavigator';
import { MainNavigatorParamList } from "./MainNavigator";

const Drawer = createDrawerNavigator<DrawerNavigatorParamList>();
const DrawerNavigator = () => {
  //Rendering
  const LocalDrawerMenu = (props: any) => {
    return (<DrawerMenu {...props} />)
  }
  return (
    <Drawer.Navigator
      initialRouteName="BottomTabNavigator"
      drawerContent={LocalDrawerMenu}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: viewportWidth * 0.8 },
        gestureEnabled: false,
        swipeEnabled: false,
      }}
      backBehavior='history'
    >
      <Drawer.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{}} />
    </Drawer.Navigator>
  );
};

export type DrawerNavigatorParamList = MainNavigatorParamList & {

}

export default DrawerNavigator