import {useFocusEffect} from '@react-navigation/core';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useCallback, useRef} from 'react';
import {Image, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import Images from '../../../assets/images';
import Container from '../../../components/container/Container';
import ErrorContainer from '../../../components/error-container/ErrorContainer';
import Header from '../../../components/header/Header';
import InputSearch from '../../../components/input-search/InputSearch';
import TopBar from '../../../components/top-bar/TabBar';
import {ServiceListResponse} from '../../../services/service/ServiceServiceConstants';
import {RootState} from '../../../stores/AppReducers';
import ServiceListActions from '../../../stores/service/list/Actions';
import {localToArray} from '../../../utils/ArrayUtil';
import {localToString} from '../../../utils/StringUtil';
import {ServiceNavigatorParamList} from '../../root/navigators/flows/ServiceNavigator';
import ServiceListItem from './components/RenderService';
import Styles from './ServiceListStyles';

const MaterialTop = createMaterialTopTabNavigator();
const ServiceList = (props: ScreenProps) => {
  const mounted = useRef(false);

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      props.getServiceList({});
      return () => {
        props.setQuery('');
      };
    }, [props.navigation]),
  );

  //rendering
  const renderHeader = () => {
    return localToArray(props.getData).map((direction: ServiceListResponse) => (
      <MaterialTop.Screen
        options={{title: localToString(direction.name)}}
        name={localToString(direction.name)}
        component={ServiceListItem}
        key={localToString(direction.name)}
      />
    ));
  };

  const renderEmpty = () => {
    if (
      props.getLoading ||
      props.getError ||
      !localToArray(props.getData).length
    ) {
      return [
        <MaterialTop.Screen
          options={{title: 'Example'}}
          name={'Example'}
          component={ServiceListItem}
        />,
        <MaterialTop.Screen
          options={{title: 'Example2'}}
          name={'Example2'}
          component={ServiceListItem}
        />,
      ];
    }
  };

  return (
    <Container style={Styles.container}>
      <Header
        title="Servicios"
        onPressLeftIcon={props.navigation.toggleDrawer}
        iconName="menu"
        leftIcon
        disableRightIcon
        rightIcon={
          <Image
            source={
              (props.user?.data?.profile_img && {
                uri: props.user?.data?.profile_img,
              }) ||
              (props.user?.data?.sex == 'F'
                ? Images.icon_profile_female
                : Images.icon_profile_male)
            }
            style={Styles.photo}
            resizeMode="cover"
          />
        }
      />
      <View style={Styles.headerSection}>
        <InputSearch
          onValueChange={props.setQuery}
          value={props.query}
          placeholder="Buscar servicio"
          widthSeparator={0}
        />
      </View>
      <ErrorContainer isLoading={props.getLoading}>
        <MaterialTop.Navigator tabBar={props => <TopBar {...props} />}>
          {renderHeader()}
          {renderEmpty()}
        </MaterialTop.Navigator>
      </ErrorContainer>
    </Container>
  );
};

interface ScreenProps
  extends ReduxProps,
    DrawerScreenProps<ServiceNavigatorParamList, 'ServiceList'> {}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,
  query: state.serviceList.query,

  getData: state.serviceList.getData,
  getLoading: state.serviceList.getLoading,
  getError: state.serviceList.getError,
});

const mapDispatchToProps = {
  setQuery: ServiceListActions.setQuery,
  getServiceList: ServiceListActions.getServiceList,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ServiceList);
