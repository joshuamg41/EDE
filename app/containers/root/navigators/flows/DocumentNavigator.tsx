import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import DocumentDetail from '../../../document/detail/DocumentDetail';
import RenderDocument from '../../../document/list/components/RenderDocument';
import DocumentList from '../../../document/list/DocumentList';
import { BottomTabNavigatorParamList } from '../BottomTabNavigator';

const Stack = createStackNavigator<DocumentNavigatorParamList>();
const DocumentNavigator = () => {
  //Rendering
  return (
    <Stack.Navigator
      initialRouteName="DocumentList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="DocumentList" component={DocumentList} />
      <Stack.Screen name="DocumentDetail" component={DocumentDetail} />
      <Stack.Screen name="DocumentListItem" component={RenderDocument} />
    </Stack.Navigator>
  );
};

export type DocumentNavigatorParamList = BottomTabNavigatorParamList & {
  DocumentList?: {
    previousScreen?: string;
    tab?: string;
  };
  DocumentListItem?: any;
}

export default DocumentNavigator