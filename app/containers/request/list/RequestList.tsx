import {DrawerScreenProps} from '@react-navigation/drawer';
import update from 'immutability-helper';
import React, {useEffect, useRef, useState} from 'react';
import {RefreshControl, TouchableOpacity, View} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect, ConnectedProps} from 'react-redux';
import Container from '../../../components/container/Container';
import ContentFlatList from '../../../components/content/ContentFlatList';
import Header from '../../../components/header/Header';
import HorizontalLine from '../../../components/horizontal-line/HorizontalLine';
import InputSearch from '../../../components/input-search/InputSearch';
import ListEmpty from '../../../components/list-empty/ListEmpty';
import Loading from '../../../components/loading/Loading';
import Separator from '../../../components/separator/Separator';
import SvgRender from '../../../components/svg-render/SvgRender';
import Text from '../../../components/text/Text';
import {RootState} from '../../../stores/AppReducers';
import RequestListActions from '../../../stores/request/list/Actions';
import {COLORS, FONTS, METRICS} from '../../../themes';
import ApplicationStyles from '../../../themes/ApplicationStyles';
import {localToArray} from '../../../utils/ArrayUtil';
import {RefreshControlBaseProps} from '../../../utils/ConstantsUtil';
import {localToString} from '../../../utils/StringUtil';
import {HomeNavigatorParamList} from '../../root/navigators/flows/HomeNavigator';
import RenderSolicitude from './components/RenderSolicitude';
import SummaryComponent from './components/SummaryComponent';
import {RequestListState} from './RequestListConstants';
import Styles from './RequestListStyles';
import {useNavigation} from '@react-navigation/native';
const RequestList = (props: ScreenProps) => {
  const navigation = useNavigation();
  const mounted = useRef(false);
  const [state, setState] = useState<RequestListState>({
    query: '',
    status: '1',
  });

  //componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      refresh();
      mounted.current = true;
      return;
    }
    return () => {
      mounted.current = false;
    };
  }, []);

  //misc
  const doRequest = (query?: string, status: string = state.status) => {
    if (!props.user.data?.citizen_id || props.getLoading) {
      return;
    }
    const request: {[key: string]: any} = {
      body: {
        status,
        type: 1,
        page: 1,
        pagination: 10,
      },
      document: props.user.data?.citizen_id,
    };
    if (query) {
      request.body.name = query;
    }
    props.getRequestList(request);
  };

  const loadMore = () => {
    if (
      props.getLoading ||
      props.moreLoading ||
      props.getData?.current_page == props.getData?.last_page
    ) {
      return;
    }
    const request: {[key: string]: any} = {
      body: {
        status: state.status,
        type: 1,
        page: props.getData?.current_page + 1,
        pagination: 10,
      },
      document: props.user.data?.citizen_id,
    };
    if (state.query) {
      request.body.name = state.query;
    }
    props.getMoreRequest(request);
  };

  const getStatistics = () => {
    const request = {
      citizen_id: props.user?.data?.citizen_id,
    };
    props.getUserStatistic(request);
  };

  const refresh = () => {
    doRequest();
    getStatistics();
    setState({
      query: '',
      status: '1',
    });
  };

  //Value change handlers
  const onStateChange =
    (key: string, format?: (value: any) => string) => (value: any) => {
      switch (key) {
        case 'query':
          if (
            localToString(value).length > 3 ||
            (value == '' && state.query.length > value.length)
          ) {
            doRequest(value);
          }
          break;
        case 'status':
          if (!value || value == state.status) {
            return;
          }
          doRequest(state.query, value);
        default:
          break;
      }
      return setState(prevState =>
        update(prevState, {[key]: {$set: format ? format(value) : value}}),
      );
    };

  //rendering
  const HeaderComponent = () => {
    return (
      <View style={Styles.headerSection}>
        <View style={Styles.summaryContent}>
          <SummaryComponent
            title={'Solicitudes Aprobadas'}
            description={props.statisticData?.reqsComplete}
          />
          <View style={Styles.verticalSeparator} />
          <SummaryComponent
            title={'Documentos Subidos'}
            description={props.statisticData?.documents}
          />
          <View style={Styles.verticalSeparator} />
          <SummaryComponent
            title={'Solicitudes Rechazadas'}
            description={props.statisticData?.reqsRejected}
          />
        </View>
        <Separator />
        <View style={ApplicationStyles.row}>
          <InputSearch
            onValueChange={onStateChange('query')}
            value={state.query}
            placeholder="Buscar solicitud"
            containerStyle={ApplicationStyles.flex1}
            widthSeparator={0}
          />
          <Menu>
            <MenuTrigger>
              <Ionicons
                name="filter"
                size={FONTS.mediumIcon}
                color={COLORS.gray}
              />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => onStateChange('status')('1')}>
                {/* @ts-ignore */}
                <Text style={Styles.filterText(state.status === '1')}>
                  En proceso
                </Text>
              </MenuOption>
              <MenuOption onSelect={() => onStateChange('status')('2')}>
                {/* @ts-ignore */}
                <Text style={Styles.filterText(state.status === '2')}>
                  Finalizada
                </Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
        <Separator height={METRICS.large15} />
        <Text style={Styles.title}>Solicitudes</Text>
      </View>
    );
  };

  const LocalRenderSolicitude = (itemProps: any) => {
    return <RenderSolicitude {...itemProps} />;
  };

  return (
    <Container style={Styles.container}>
      <Header
        title="Mis Servicios"
        onPressLeftIcon={props.navigation.toggleDrawer}
        iconName="menu"
        leftIcon
      />
      <ContentFlatList
        //@ts-ignore
        data={props.getData.data}
        renderItem={LocalRenderSolicitude}
        ListHeaderComponent={HeaderComponent()}
        ItemSeparatorComponent={HorizontalLine}
        ListEmptyComponent={
          <ListEmpty errorText="No existen solicitudes para esta búsqueda" />
        }
        contentContainerStyle={Styles.content}
        onEndReachedThreshold={0.5}
        onEndReached={loadMore}
        ListFooterComponent={
          <Loading
            isLoading={props.moreLoading}
            color={COLORS.primary}
            bottomSeparate={true}
          />
        }
        refreshControl={
          <RefreshControl
            {...RefreshControlBaseProps}
            refreshing={props.getLoading}
            onRefresh={refresh}
          />
        }
      />
      <TouchableOpacity
        style={Styles.notificationContent}
        onPress={() => {
          props.navigation.navigate('Notifications');
        }}>
        <Ionicons
          name="notifications-outline"
          size={FONTS.mediumIcon}
          color={COLORS.secondary}
        />
      </TouchableOpacity>
    </Container>
  );
};

interface ScreenProps
  extends ReduxProps,
    DrawerScreenProps<HomeNavigatorParamList, 'RequestList'> {}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  getData: state.requestList.getData,
  getLoading: state.requestList.getLoading,
  getError: state.requestList.getError,
  moreLoading: state.requestList.moreLoading,

  statisticData: state.requestList.statisticData,
  statisticLoading: state.requestList.statisticLoading,
  statisticError: state.requestList.statisticError,
});

const mapDispatchToProps = {
  getRequestList: RequestListActions.getRequestList,
  getUserStatistic: RequestListActions.getUserStatistic,
  getMoreRequest: RequestListActions.getMoreRequest,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(RequestList);
