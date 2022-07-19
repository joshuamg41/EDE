import { useFocusEffect } from '@react-navigation/core';
import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { connect, ConnectedProps } from "react-redux";
import Container from '../../../components/container/Container';
import ContentFlatList from '../../../components/content/ContentFlatList';
import Header from '../../../components/header/Header';
import HorizontalLine from '../../../components/horizontal-line/HorizontalLine';
import ListEmpty from '../../../components/list-empty/ListEmpty';
import Loading from '../../../components/loading/Loading';
import Separator from '../../../components/separator/Separator';
import { RootState } from '../../../stores/AppReducers';
import RatingListActions from '../../../stores/rating/list/Actions';
import { COLORS } from '../../../themes';
import ApplicationStyles from '../../../themes/ApplicationStyles';
import { localToArray } from '../../../utils/ArrayUtil';
import { RefreshControlBaseProps } from '../../../utils/ConstantsUtil';
import { ServiceNavigatorParamList } from '../../root/navigators/flows/ServiceNavigator';
import RenderRating from './components/RenderRating';
import { RatingListState } from './RatingListConstants';

const RatingList = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [state, setState] = useState<RatingListState>({})

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      doRequest()
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
    if (props.getLoading) {
      return
    }
    const request: { [key: string]: any } = {
      header: {
        service_id: props.serviceDetail.id,
      },
      body: {
        page: 1,
        pagination: 10,
      },
      document: props.user.data?.citizen_id,
    }
    props.getRatingList(request)
  }

  const loadMore = () => {
    if (props.getLoading || props.moreLoading || (props.getData?.current_page == props.getData?.last_page)) {
      return
    }
    const request: { [key: string]: any } = {
      header: {
        service_id: props.serviceDetail.id,
      },
      body: {
        page: props.getData?.current_page + 1,
        pagination: 10,
      },
    }
    props.getMoreRating(request)
  }

  //rendering
  const LocalRenderRating = (itemProps: any) => {
    return (
      <View style={ApplicationStyles.pLarge}>
        <RenderRating
          {...itemProps}
        />
      </View>
    )
  }

  return (
    <Container>
      <Header
        title='Reseñas'
        leftIcon
      />
      <ContentFlatList
        data={localToArray(props.getData.data)}
        renderItem={LocalRenderRating}
        ItemSeparatorComponent={HorizontalLine}
        ListHeaderComponent={View}
        onEndReachedThreshold={0.5}
        onEndReached={loadMore}
        ListFooterComponent={
          <Loading
            isLoading={props.moreLoading}
            color={COLORS.primary}
            bottomSeparate={true}
          />

        }
        ListEmptyComponent={<ListEmpty isLoading={props.getLoading} errorText='Aún no existen reseñas' />}
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

interface ScreenProps extends ReduxProps, DrawerScreenProps<ServiceNavigatorParamList, 'RatingList'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  serviceDetail: state.serviceDetail.getData,

  getData: state.ratingList.getData,
  getLoading: state.ratingList.getLoading,
  getError: state.ratingList.getError,

  moreLoading: state.ratingList.moreLoading,
});

const mapDispatchToProps = {
  getRatingList: RatingListActions.getRatingList,
  getMoreRating: RatingListActions.getMoreRating,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(RatingList)