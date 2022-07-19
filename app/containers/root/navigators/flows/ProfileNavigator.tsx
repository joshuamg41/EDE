import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import { ProfileBusinessItem } from '../../../../services/profile/ProfileServiceConstants';
import ProfileBusiness from '../../../profile/business/ProfileBusiness';
import ProfileEdit from '../../../profile/edit/ProfileEdit';
import ProfileMain from '../../../profile/main/ProfileMain';
import { BottomTabNavigatorParamList } from '../BottomTabNavigator';

const Stack = createStackNavigator<ProfileNavigatorParamList>();
const ProfileNavigator = () => {
  //Rendering
  return (
    <Stack.Navigator
      initialRouteName="ProfileMain"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ProfileMain" component={ProfileMain} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      <Stack.Screen name="ProfileBusiness" component={ProfileBusiness} />
    </Stack.Navigator>
  );
};

export type ProfileNavigatorParamList = BottomTabNavigatorParamList & {
  ProfileMain?: any;
  ProfileEdit?: {
    editMode?: boolean;
  };
  ProfileBusiness?: ProfileBusinessItem;
}

export default ProfileNavigator