import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { connect, ConnectedProps } from "react-redux";
import RNFetchBlob from 'react-native-blob-util';
import { Images } from '../../../assets';
import Attach from '../../../components/attach/Attach';
import Button from '../../../components/button/Button';
import Container, { ContainerRef } from '../../../components/container/Container';
import Content from '../../../components/content/Content';
import Header from '../../../components/header/Header';
import RenderColumn from '../../../components/render/column/RenderColumn';
import CheckRender from '../../../components/security/CheckRender';
import Separator from '../../../components/separator/Separator';
import Text from '../../../components/text/Text';
import { RootState } from '../../../stores/AppReducers';
import PaymentFormActions from '../../../stores/payment/form/Actions';
import RequestResolveActions from '../../../stores/request/resolve/Actions';
import { METRICS } from '../../../themes';
import ApplicationStyles from '../../../themes/ApplicationStyles';
import { emptyOrArray, localToArray } from '../../../utils/ArrayUtil';
import { cleanString } from '../../../utils/StringUtil';
import { isEmpty } from '../../../utils/ValidationUtil';
import { HomeNavigatorParamList } from '../../root/navigators/flows/HomeNavigator';
import { PaymentFormState } from './PaymentFormConstants';
import Styles from './PaymentFormStyles';

const PaymentForm = (props: ScreenProps) => {
  const mounted = useRef(false);
  const containerRef = useRef<ContainerRef>(null);
  const [state, setState] = useState<PaymentFormState>({
    transference: undefined,
    deposit: undefined,
  })
  const [alternativeVisible, setAlternativeVisible] = useState<boolean>(false)
  const { errors, handleChange, handleBlur, setFieldValue, values, touched, handleSubmit, resetForm } = useFormik({
    initialValues: state,
    onSubmit: (values, actions) => postAlternativePayment({ values, actions }),
    // validationSchema: schemaValidation,
    enableReinitialize: true,
  })

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      if (props.route.params?.paymentComplete) {
        props.navigation.popToTop()
        props.navigation.navigate('HomeNavigator')
      }
      return () => { }
    }, [props.navigation])
  );

  useFocusEffect(
    useCallback(() => {
      if (props.route.params?.paymentComplete) {
        props.navigation.popToTop()
        props.navigation.navigate('HomeNavigator')
      }
      return () => { }
    }, [props.route])
  );

  //componentDidUpdate
  useEffect(() => {
    if (mounted.current && props.postData?.success) {
      containerRef.current?.showSuccess()
    }
    return () => { }
  }, [props.postData])

  //misc
  //get the payment status
  const doRequest = () => {
    const request = {
      idAutorizacionPortal: props.route.params?.authorizationId,
    }
    props.getPaymentStatus(request)
  }

  const postAlternativePayment = ({ values, actions }: { values: PaymentFormState; actions: any }) => {
    const _doc = (emptyOrArray(values.deposit) || emptyOrArray(values.transference))?.map((field) => {
      return {
        name: 'file[]',
        filename: field?.name,
        type: field?.type,
        data: RNFetchBlob.wrap(field?.uri.replace('file://', '')),
      }
    })

    const request = {
      fileRequest: _doc,
      associateRequest: {
        title: `documento-${props.user?.data?.citizen_id}`,
        record_id: props.requestDetail?.request?.code,
        attribute: `NumeroSolicitud=${props.requestDetail?.request?.code};DocumentoIdentidadSolicitante=${props.user?.data?.citizen_id};TipoDocumentoPortal=Adjunto`,
        process_id: props.requestDetail?.request?.service?.process_id,
        acronym: `${props.requestDetail?.direction?.name}DE`,
        names: [
          "Comprobante de pago"
        ],
        activity_id: props.requestDetail?.request?.activity?.activity_id,
        new_request: false,
      },
      label: 'Comprobante de pago',
      voucher: true,
      status: true,
      RequestID: props.requestDetail?.request?.id,
    }

    props.postDocumentResolve(request)
  }

  const showSolicitudeCode = () => {
    if (props.route.params?.from == 'ServiceSolicitude') {
      return props.serviceDetail.send
    } else {
      return !props.requestDetail.request.provisional
    }
  }

  //leaveScreen
  const leave = () => {
    if (props.route.params?.from == 'ServiceSolicitude') {
      props.navigation.popToTop()
      props.navigation.navigate('HomeNavigator')
    } else {
      props.navigation.goBack()
    }
  }

  //value change handlers
  const _handleChange = (key: string) => (value: any) => {
    return setFieldValue(key, value)
  }

  //rendering
  return (
    <Container
      ref={containerRef}
      successMessage='Información enviada correctamente'
      successFunction={leave}
    >
      <Header
        title="Pago de servicio"
        leftIcon={props.route.params?.from != 'ServiceSolicitude'}
      />
      <Content contentContainerStyle={ApplicationStyles.hPLarge}>
        <Text style={Styles.subTitle}>Información general de la solicitud</Text>
        <Separator height={METRICS.medium10} />
        <RenderColumn
          title='Fecha:'
          body={props.route.params?.date}
        />
        <RenderColumn
          title='Empresa:'
          body={props.route.params?.businessName}
        />
        <CheckRender allowed={showSolicitudeCode()}>
          <RenderColumn
            title='Numero de solicitud:'
            body={props.route.params?.solicitudeId}
          />
        </CheckRender>
        <RenderColumn
          title='Servicio:'
          body={props.route.params?.serviceName}
        />
        <RenderColumn
          title='Costo:'
          body={props.route.params?.servicePrice}
        />
        <Separator height={METRICS.medium10} />
        <Text style={Styles.subTitle}>Selecciona una forma de pago</Text>
        <Separator height={METRICS.medium10} />
        <CheckRender allowed={props.route.params?.siritCode && isEmpty(values?.transference) && isEmpty(values?.deposit)}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('PaymentSirite', {
              ...props.route.params,
              servicePrice: cleanString(props.route.params?.servicePrice),
              authorizationId: cleanString(props.route.params?.authorizationId),
              recaudationCode: cleanString(props.route.params?.recaudationCode),
              siritCode: props.route.params?.siritCode,
            })}
            style={Styles.siriteTouchable}
          >
            <View>
              <Image
                source={Images.logo_sirite}
                style={Styles.siriteImage}
                resizeMode='contain'
              />
              <Separator height={METRICS.small5} />
              <Text style={Styles.siriteText}>Tarjeta de Débito/Crédito</Text>
            </View>
          </TouchableOpacity>
          <Separator />
        </CheckRender>
        <CheckRender allowed={true || props.route.params?.externalPay}>
          <CheckRender allowed={isEmpty(values?.deposit)}>
            <Attach
              title={
                isEmpty(values?.transference) ?
                  'Adjuntar comprobante de seguro' :
                  'Transferencia'
              }
              buttonTheme='tertiaryOutline'
              value={values?.transference}
              onValueChange={_handleChange('transference')}
              buttonTitle='Transferencia'
              bottomSeparate={false}
              options={['camera', 'library', 'document']}
              showButton={!(localToArray(values?.transference).length)}
              showError={touched.transference && errors.transference}
              widthSeparator={0}
              showTitle={values?.transference ? true : false}
            />
          </CheckRender>
          <CheckRender allowed={isEmpty(values?.transference)}>
            <Attach
              title={
                isEmpty(values?.transference) ?
                  'Adjuntar comprobante de seguro' :
                  'Depósito'
              }
              buttonTheme='tertiaryOutline'
              value={values?.deposit}
              onValueChange={_handleChange('deposit')}
              buttonTitle='Depósito'
              bottomSeparate={false}
              options={['camera', 'library', 'document']}
              showButton={!(localToArray(values?.deposit).length)}
              showError={touched.deposit && errors.deposit}
              widthSeparator={0}
              showTitle={values?.deposit ? true : false}
            />
          </CheckRender>
        </CheckRender>
        <CheckRender allowed={props.route.params?.from == 'ServiceSolicitude'}>
          <Button
            title='Pagar después'
            theme='primaryOutline'
            onPress={() => leave()}
            widthSeparator={0}
          />
        </CheckRender>
      </Content>
      <CheckRender allowed={!isEmpty(values?.transference) || !isEmpty(values?.deposit)}>
        <Button
          title='Enviar comprobante'
          theme='primary'
          isLoading={props.postLoading}
          onPress={() => { }}
        />
      </CheckRender>
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<HomeNavigatorParamList, 'PaymentForm'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  requestDetail: state.requestDetail.getData,
  serviceDetail: state.serviceDetail.getData,

  postData: state.requestResolve.postData,
  postLoading: state.requestResolve.postLoading,
  postError: state.requestResolve.postError,
});

const mapDispatchToProps = {
  getPaymentStatus: PaymentFormActions.getPaymentStatus,
  postDocumentResolve: RequestResolveActions.postDocumentResolve,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(PaymentForm)