import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import update from 'immutability-helper';
import React, { useCallback, useRef, useState } from 'react';
import { connect, ConnectedProps } from "react-redux";
import Button from '../../../components/button/Button';
import Container from '../../../components/container/Container';
import ContentFlatList from '../../../components/content/ContentFlatList';
import Header from '../../../components/header/Header';
import HorizontalLine from '../../../components/horizontal-line/HorizontalLine';
import ListEmpty from '../../../components/list-empty/ListEmpty';
import RequestHeader from '../../../components/request-header/RequestHeader';
import { RootState } from '../../../stores/AppReducers';
import { COLORS } from '../../../themes';
import { localToArray } from '../../../utils/ArrayUtil';
import { HomeNavigatorParamList } from '../../root/navigators/flows/HomeNavigator';
import { ClaimListState } from './ClaimListConstants';
import RenderClaimItem from './components/RenderClaimItem';
import ClaimListActions from '../../../stores/claim/list/Actions';

const ClaimList = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [state, setState] = useState<ClaimListState>({})

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      doRequest()
      return () => { }
    }, [props.navigation])
  );

  //Misc
  const doRequest = () => {
    const request = {
      head: {
        id: props.requestDetail?.request?.code,
      },
      body: {

      },
    }
    props.getClaimList(request)
  }

  //Value change handlers
  const onStateChange = (key: string, format?: (value: any) => string) => (value: any) => {
    return setState(prevState => update(prevState, { [key]: { $set: format ? format(value) : value } }));
  };

  //rendering
  return (
    <Container>
      <Header
        title="Quejas y reclamaciones"
        leftIcon
      />
      <ContentFlatList
        data={localToArray(props.getData)}
        //@ts-ignore
        renderItem={RenderClaimItem}
        ItemSeparatorComponent={HorizontalLine}
        ListHeaderComponent={<RequestHeader />}
        ListEmptyComponent={
          <ListEmpty
            errorText='No existe ninguna reclamación asociada a este servicio. Puedes comenzar una nueva queja.'
            errorColor={COLORS.grayPlaceholder}
          />
        }
      />
      <Button
        title='Nueva reclamación'
        theme='primaryOutline'
        onPress={() => props.navigation.navigate('ClaimSolicitude')}
      />
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<HomeNavigatorParamList, 'ClaimList'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  requestDetail: state.requestDetail.getData,

  getData: state.claimList.getData,
  getLoading: state.claimList.getLoading,
  getError: state.claimList.getError,
});

const mapDispatchToProps = {
  getClaimList: ClaimListActions.getClaimList,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(ClaimList)