import { useFocusEffect } from '@react-navigation/core';
import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { connect, ConnectedProps } from "react-redux";
import Container from '../../../components/container/Container';
import ContentFlatList from '../../../components/content/ContentFlatList';
import Header from '../../../components/header/Header';
import ListEmpty from '../../../components/list-empty/ListEmpty';
import Separator from '../../../components/separator/Separator';
import { DraftListItem } from '../../../services/draft/DraftServiceConstants';
import { RootState } from '../../../stores/AppReducers';
import DraftListActions from '../../../stores/draft/list/Actions';
import ServiceDetailActions from '../../../stores/service/detail/Actions';
import { localToArray } from '../../../utils/ArrayUtil';
import { RefreshControlBaseProps } from '../../../utils/ConstantsUtil';
import { DraftNavigatorParamList } from '../../root/navigators/flows/DraftNavigator';
import RenderDraftItem from './components/RenderDraftItem';
import { DraftListState } from './DraftListConstants';

const DraftList = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [state, setState] = useState<DraftListState>({})

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      if (!localToArray(props.getData.data).length) {
        doRequest()
      }
      //function
      return () => { }
    }, [props.navigation])
  );

  //componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    return () => { mounted.current = false }
  }, [])

  //Misc
  const doRequest = () => {
    if (!props.user.data?.citizen_id || props.getLoading) {
      return
    }
    props.getDraftList(props.user.data?.citizen_id)
  }

  const goToForm = (formId: string) => {
    const request = {
      head: {
        id: formId,
      },
      body: {
        citizen_id: props.user?.data?.citizen_id,
      },
      navigate: 'ServiceSolicitude',
    }
    props.getServiceDetail(request)
  }

  const localRenderDraft = ({ item, index }: { item: DraftListItem, index: number }) => {
    return (
      <RenderDraftItem
        item={item}
        index={index}
        onPress={goToForm}
      />
    )
  }

  //rendering
  return (
    <Container
      modalLoading={props.serviceLoading == 'ServiceSolicitude'}
    >
      <Header
        title='Borradores'
        onPressLeftIcon={props.navigation.toggleDrawer}
        iconName='menu'
        leftIcon
      />
      <ContentFlatList
        data={localToArray(props.getData.data)}
        //@ts-ignore
        renderItem={localRenderDraft}
        ItemSeparatorComponent={() => <Separator height={10} />}
        ListFooterComponent={View}
        ListEmptyComponent={<ListEmpty isLoading={props.getLoading} errorText='Aún no existen borradores' />}
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
  )
}

interface ScreenProps extends ReduxProps, DrawerScreenProps<DraftNavigatorParamList, 'DraftList'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  serviceDetail: state.serviceDetail.getData,
  serviceLoading: state.serviceDetail.getLoading,

  getData: state.draftList.getData,
  getLoading: state.draftList.getLoading,
  getError: state.draftList.getError,
});

const mapDispatchToProps = {
  getDraftList: DraftListActions.getDraftList,
  getServiceDetail: ServiceDetailActions.getServiceDetail,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(DraftList)