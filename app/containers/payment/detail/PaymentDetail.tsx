import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import update from 'immutability-helper';
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
import { PaymentDetailState } from './PaymentDetailConstants';

const PaymentDetail = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [state, setState] = useState<PaymentDetailState>({})

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
        title="Detalle de pago"
        leftIcon
      />
      <Content>
        <RequestHeader />
        <Separator />
        <View style={ApplicationStyles.hPLarge}>
          <RenderColumn
            title='Monto pagado'
            body='RD$2,500.00'
            size='regular'
          />
          <RenderColumn
            title='Fecha de transacción'
            body='2 de septiembre de 2021'
            size='regular'
          />
          <RenderColumn
            title='Confirmación de pago'
            body='835271643'
            size='regular'
          />
        </View>
      </Content>
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<HomeNavigatorParamList, 'PaymentDetail'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  getData: state.paymentDetail.getData,
  getLoading: state.paymentDetail.getLoading,
  getError: state.paymentDetail.getError,
});

const mapDispatchToProps = {

}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(PaymentDetail)