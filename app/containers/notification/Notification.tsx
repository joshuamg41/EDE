import {useFocusEffect} from '@react-navigation/core';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import update from 'immutability-helper';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {RefreshControl} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import Container from '../../components/container/Container';
import ContentFlatList from '../../components/content/ContentFlatList';
import Header from '../../components/header/Header';
import ListEmpty from '../../components/list-empty/ListEmpty';
import Separator from '../../components/separator/Separator';
import {NotificationListItem} from '../../services/notification/NotificationServiceConstants';
import {RootState} from '../../stores/AppReducers';
import NotificationActions from '../../stores/notification/Actions';
import {localToArray} from '../../utils/ArrayUtil';
import {RefreshControlBaseProps} from '../../utils/ConstantsUtil';
import {HomeNavigatorParamList} from '../root/navigators/flows/HomeNavigator';
import RenderNotification from './components/RenderNotification';
import {NotificationState} from './NotificationConstants';
import Styles from './NotificationStyles';

const MaterialTop = createMaterialTopTabNavigator();
const Notification = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [state, setState] = useState<NotificationState>({});

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      doRequest();
      //function
      return () => {};
    }, [props.navigation]),
  );

  //componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    return () => {
      mounted.current = false;
    };
  }, []);

  //Misc
  const doRequest = () => {
    const request = {
      citizen_id: props.user?.data?.citizen_id,
    };
    props.getNotification(request);
  };

  //Value change handlers
  const onStateChange =
    (key: string, format?: (value: any) => string) => (value: any) => {
      return setState(prevState =>
        update(prevState, {[key]: {$set: format ? format(value) : value}}),
      );
    };

  //rendering
  const LocalRenderNotification = ({
    item,
    index,
  }: {
    item: NotificationListItem;
    index: number;
  }) => {
    return <RenderNotification item={item} index={index} />;
  };

  return (
    <Container style={Styles.container}>
      <Header
        title="Notificaciones"
        onPressLeftIcon={props.navigation.goBack}
        iconName="caret-back-sharp"
        leftIcon
      />
      <ContentFlatList
        data={localToArray(props.getData)}
        //@ts-ignore
        renderItem={LocalRenderNotification}
        ItemSeparatorComponent={() => <Separator height={10} />}
        ListEmptyComponent={
          <ListEmpty
            isLoading={props.getLoading}
            errorText={'Parece que ya leiste \n todas tus notificaciones'}
            separator={false}
          />
        }
        refreshControl={
          <RefreshControl
            {...RefreshControlBaseProps}
            refreshing={props.getLoading}
            onRefresh={doRequest}
            progressViewOffset={0}
          />
        }
      />
    </Container>
  );
};

interface ScreenProps
  extends ReduxProps,
    DrawerScreenProps<HomeNavigatorParamList, 'Notification'> {}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  getData: state.notification.getData,
  getLoading: state.notification.getLoading,
  getError: state.notification.getError,
});

const mapDispatchToProps = {
  getNotification: NotificationActions.getNotification,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Notification);
