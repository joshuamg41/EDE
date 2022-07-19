import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import update from 'immutability-helper';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import WebView, { WebViewNavigation } from 'react-native-webview';
import { connect, ConnectedProps } from "react-redux";
import Container from '../../../components/container/Container';
import Header from '../../../components/header/Header';
import { RootState } from '../../../stores/AppReducers';
import { localToString, searchInString } from '../../../utils/StringUtil';
import { HomeNavigatorParamList } from '../../root/navigators/flows/HomeNavigator';
import { PaymentSiriteState } from './PaymentSiriteConstants';
import Styles from './PaymentSiriteStyles';
import PaymentSiriteActions from '../../../stores/payment/sirite/Actions';
import { localToNumber } from '../../../utils/NumberUtil';
import Config from 'react-native-config';

const PaymentSirite = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [state, setState] = useState<PaymentSiriteState>({})

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
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
  const handleUrlChange = (event: WebViewNavigation) => {
    console.log(event)
    if (searchInString(event.url, 'pagoCompletado')) {
      doUpdatePayment(event.url)
      if (props.route.params?.from == 'PaymentList') {
        props.navigation.navigate('PaymentList', {
          ...props.route.params,
          paymentComplete: true,
          from: 'PaymentSirite',
          date: new Date(),
        })
        return
      } else if (props.route.params?.from == 'RequestResolve') {
        props.navigation.navigate('RequestResolve', {
          ...props.route.params,
          paymentComplete: true,
          from: 'PaymentSirite',
          date: new Date(),
        })
      } else {
        props.navigation.navigate('PaymentForm', {
          ...props.route.params,
          paymentComplete: true,
          from: 'PaymentSirite',
          date: String(new Date()),
        })
      }
    }
  }

  const doUpdatePayment = (url: string) => {
    const _url = localToString(url).split('=')
    const request = {
      requestId: localToNumber(props.route.params?.requestId),
      idAutorizacionPortal: localToString(props.route.params?.authorizationId),
      numAprobacion: localToString(_url[1].split('&')[0]),
    }
    props.updatePaymentInfo(request)
  }

  //Value change handlers
  const onStateChange = (key: string, format?: (value: any) => string) => (value: any) => {
    return setState(prevState => update(prevState, { [key]: { $set: format ? format(value) : value } }));
  };

  //rendering
  return (
    <Container style={Styles.container}>
      <Header
        title='Pago Sirite'
        leftIcon
      />
      <WebView
        source={{
          html: `
        <html>
            <head></head>
            <body>
            <form id='form' action='${Config.SIRITE_URL}/pasarela-pago/transaccion' method='POST'>
            <input type='hidden' name='codigoCentroRecaudacion' value=${props.route.params?.recaudationCode}>
            <input type='hidden' name='codigoServicio' value=${props.route.params?.siritCode}>
            <input type='hidden' name='montoServicio' value=${props.route.params?.servicePrice}>
            <input type='hidden' name='urlRetorno' value="${'http://127.0.0.1:3000/app/pagoCompletado'}">
            <input type='hidden' name='nombre' value="${props.user.data?.name} ${props.user.data?.first_last_name} ${props.user.data?.second_last_name}">
            <input type='hidden' name='numeroDocumento' value="${props.user.data?.citizen_id}">
            <input type='hidden' name='tipoDocumento' value=${'C'}>
            <input type='hidden' name='medioPago' value=${'PagoEnLinea'}>
            <input type='hidden' name='idAutorizacionPortal' value=${props.route.params?.authorizationId}>
            <input type='hidden' name='numeroAutorizacion' value=${''}>
            </form>
            <script>
            window.onload= function(){
                document.getElementById('form').submit()
            }
            </script>
            </body>
        </html>
        `}}
        // source={{ uri: 'https://reactnative.dev/' }}
        onNavigationStateChange={handleUrlChange}
      />
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<HomeNavigatorParamList, 'PaymentSirite'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  updateData: state.paymentSirite.updateData,
  updateLoading: state.paymentSirite.updateLoading,
  updateError: state.paymentSirite.updateError,
});

const mapDispatchToProps = {
  updatePaymentInfo: PaymentSiriteActions.updatePaymentInfo,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(PaymentSirite)