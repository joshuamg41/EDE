import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import update from 'immutability-helper';
import moment from 'moment';
import React, { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import { connect, ConnectedProps } from "react-redux";
import Container, { ContainerRef } from '../../../components/container/Container';
import Content from '../../../components/content/Content';
import Header from '../../../components/header/Header';
import RenderColumn from '../../../components/render/column/RenderColumn';
import RequestHeader from '../../../components/request-header/RequestHeader';
import Separator from '../../../components/separator/Separator';
import { RootState } from '../../../stores/AppReducers';
import ApplicationStyles from '../../../themes/ApplicationStyles';
import { HomeNavigatorParamList } from '../../root/navigators/flows/HomeNavigator';
import { ClaimDetailState } from './ClaimDetailConstants';

const ClaimDetail = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [state, setState] = useState<ClaimDetailState>({})
  const [readMore, setReadMore] = useState<boolean>(false)

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      return () => { }
    }, [props.navigation])
  );

  //Value change handlers
  const onStateChange = (key: string, format?: (value: any) => string) => (value: any) => {
    return setState(prevState => update(prevState, { [key]: { $set: format ? format(value) : value } }));
  };

  //rendering
  return (
    <Container>
      <Header
        title="Detalle de Reclamación"
        leftIcon
      />
      <Content>
        <RequestHeader />
        <Separator />
        <View style={ApplicationStyles.hPLarge}>
          <RenderColumn
            title='Fecha'
            body={moment(props.route.params?.created_at, 'YYYY-MM-DD HH:mm:ss').format('DD/MMM/YYYY')}
            size='regular'
          />
          <RenderColumn
            title='Estatus'
            body={props.route.params?.status}
            size='regular'
          />
          <RenderColumn
            title='Motivo de la reclamación'
            body={`${props.route.params?.issue_id}`}
            size='regular'
          />
          <RenderColumn
            title='Detalles del problema'
            body={props.route.params?.description}
            size='regular'
          />
        </View>
      </Content>
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<HomeNavigatorParamList, 'ClaimDetail'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  getData: state.claimDetail.getData,
  getLoading: state.claimDetail.getLoading,
  getError: state.claimDetail.getError,
});

const mapDispatchToProps = {

}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(ClaimDetail)