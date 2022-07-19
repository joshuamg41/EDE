import {useFocusEffect} from '@react-navigation/core';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useCallback, useRef, useState} from 'react';
import {View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import Container from '../../../components/container/Container';
import Header from '../../../components/header/Header';
import InputSearch from '../../../components/input-search/InputSearch';
import TopBar from '../../../components/top-bar/TabBar';
import {RootState} from '../../../stores/AppReducers';
import DocumentListActions from '../../../stores/document/list/Actions';
import {DocumentNavigatorParamList} from '../../root/navigators/flows/DocumentNavigator';
import DocumentListItem from './components/RenderDocument';
import {DocumentListState} from './DocumentListConstants';
import Styles from './DocumentListStyles';

const MaterialTop = createMaterialTopTabNavigator();
const DocumentList = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [state, setState] = useState<DocumentListState>({});

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      return () => {};
    }, [props.navigation]),
  );

  //Value change handlers
  const onChangeQuery = (value?: string) => {
    if (!value) {
      return props.documentQuery('');
    }
    return props.documentQuery(value);
  };

  //rendering
  const LocalTopBar = (barProps: any) => {
    return <TopBar {...barProps} />;
  };

  return (
    <Container style={Styles.container}>
      <Header
        title="INICIO"
        onPressLeftIcon={props.navigation.toggleDrawer}
        iconName="menu"
        leftIcon
      />

      {/* <View style={Styles.headerSection}>
        <InputSearch
          onValueChange={onChangeQuery}
          value={props.query}
          placeholder="Buscar documento"
          widthSeparator={0}
        />
      </View> */}
      {/* <MaterialTop.Navigator
        initialRouteName={'personal'}
        tabBar={LocalTopBar}
        screenOptions={{lazy: true}}>
        <MaterialTop.Screen
          options={{title: 'Personales'}}
          name="personal"
          component={DocumentListItem}
        />
        <MaterialTop.Screen
          options={{title: 'Institucionales'}}
          name="institutional"
          component={DocumentListItem}
        />
      </MaterialTop.Navigator> */}
    </Container>
  );
};

interface ScreenProps
  extends ReduxProps,
    DrawerScreenProps<DocumentNavigatorParamList, 'DocumentList'> {}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,
  query: state.documentList.query,
});

const mapDispatchToProps = {
  documentQuery: DocumentListActions.documentQuery,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(DocumentList);
