import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import update from 'immutability-helper';
import moment from 'moment';
import React, { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import { connect, ConnectedProps } from "react-redux";
import Button from '../../../components/button/Button';
import Container, { ContainerRef } from '../../../components/container/Container';
import ContentFlatList from '../../../components/content/ContentFlatList';
import Header from '../../../components/header/Header';
import HorizontalLine from '../../../components/horizontal-line/HorizontalLine';
import ListEmpty from '../../../components/list-empty/ListEmpty';
import RenderColumn from '../../../components/render/column/RenderColumn';
import RequestHeader from '../../../components/request-header/RequestHeader';
import CheckRender from '../../../components/security/CheckRender';
import { RootState } from '../../../stores/AppReducers';
import { COLORS } from '../../../themes';
import ApplicationStyles from '../../../themes/ApplicationStyles';
import { localToArray } from '../../../utils/ArrayUtil';
import { localToString } from '../../../utils/StringUtil';
import { HomeNavigatorParamList } from '../../root/navigators/flows/HomeNavigator';
import RenderPaymentItem from './components/RenderPaymentItem';
import { PaymentListState } from './PaymentListConstants';

const PaymentList = (props: ScreenProps) => {
  const mounted = useRef(false);
  const containerRef = useRef<ContainerRef>(null);
  const [state, setState] = useState<PaymentListState>({})

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      return () => { }
    }, [props.navigation])
  );

  useFocusEffect(
    useCallback(() => {
      if (props.route.params?.paymentComplete) {
        containerRef.current?.showSuccess()
      }
      return () => { }
    }, [props.route])
  );

  //Value change handlers
  const onStateChange = (key: string, format?: (value: any) => string) => (value: any) => {
    return setState(prevState => update(prevState, { [key]: { $set: format ? format(value) : value } }));
  };

  //rendering
  return (
    <Container
      ref={containerRef}
      successMessage='Pago realizado exitosamente'
    >
      <Header
        title="Pagos"
        leftIcon
      />
      <ContentFlatList
        data={localToArray(props.requestDetail?.priceRequest)}
        //@ts-ignore
        renderItem={RenderPaymentItem}
        ItemSeparatorComponent={HorizontalLine}
        ListHeaderComponent={
          <View>
            <CheckRender allowed={!props.requestDetail.request.approval_number}>
              <View style={ApplicationStyles.hPLarge}>
                <RenderColumn
                  title={`Estatus: ${props.requestDetail?.request?.payment?.payment_status}`}
                  body={`RD$ ${props.requestDetail?.request?.payment?.payment_amount}`}
                  size='regular'
                />
              </View>
            </CheckRender>
            <RequestHeader />
            <CheckRender allowed={!localToArray(props.requestDetail?.priceRequest).length && !props.requestDetail?.request.approval_number}>
              <ListEmpty
                errorText='No existe ningún pago asociado a este servicio. Puedes realizar tu pago ahora.'
                errorColor={COLORS.grayPlaceholder}
                containerStyle={ApplicationStyles.hPMedium}
              />
            </CheckRender>
          </View>
        }
        ListFooterComponent={View}
      />
      <CheckRender allowed={!props.requestDetail?.request?.approval_number && !props.updateLoading && !props.updateData?.success}>
        <Button
          title='Realizar Pago'
          theme='primaryOutline'
          onPress={() => props.navigation.navigate('PaymentForm', {
            date: moment(props.requestDetail?.request?.created_at).format("DD [de] MMMM [de] YYYY"),
            businessName: 'Negocio de Prueba',
            requestId: props.requestDetail?.request?.id,
            servicePrice: localToString(props.requestDetail?.request?.payment?.payment_amount),
            solicitudeId: localToString(props.requestDetail?.request?.code),
            serviceName: localToString(props.requestDetail?.request?.service?.name),
            authorizationId: localToString(props.requestDetail?.request?.idAutorizacionPortal),
            recaudationCode: localToString(props.requestDetail?.request?.service?.institution?.recaudationCode),
            siritCode: localToString(props.requestDetail?.request?.service?.sirit_code),
            from: 'PaymentList',
          })}
        />
      </CheckRender>
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<HomeNavigatorParamList, 'PaymentList'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  requestDetail: state.requestDetail.getData,

  updateLoading: state.paymentSirite.updateLoading,
  updateData: state.paymentSirite.updateData,
});

const mapDispatchToProps = {

}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(PaymentList)