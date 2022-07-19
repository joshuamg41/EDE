import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect, ConnectedProps } from "react-redux";
import RNFetchBlob from 'react-native-blob-util';
import * as yup from 'yup';
import Attach from '../../../components/attach/Attach';
import Button from '../../../components/button/Button';
import Container, { ContainerRef } from '../../../components/container/Container';
import Content from '../../../components/content/Content';
import Header from '../../../components/header/Header';
import Input from '../../../components/Input/Input';
import RequestHeader from '../../../components/request-header/RequestHeader';
import CheckRender from '../../../components/security/CheckRender';
import Separator from '../../../components/separator/Separator';
import Text from '../../../components/text/Text';
import { RequestResolveRequest } from '../../../services/request/RequestServiceConstants';
import { RootState } from '../../../stores/AppReducers';
import RequestResolveActions from '../../../stores/request/resolve/Actions';
import { localToArray } from '../../../utils/ArrayUtil';
import { defaultString, localToString, tagToBold } from '../../../utils/StringUtil';
import { HomeNavigatorParamList } from '../../root/navigators/flows/HomeNavigator';
import { RequestResolveState } from './RequestResolveConstants';
import Styles from './RequestResolveStyles';
import moment from 'moment';

const RequestResolve = (props: ScreenProps) => {
  const mounted = useRef(false);
  const containerRef = useRef<ContainerRef>(null);
  const [state, setState] = useState<RequestResolveState>({
    text: undefined,
    doc: undefined,
  })
  const [schemaValidation, setSchemaValidation] = useState<{ [key: string]: any }>({})
  const { errors, handleBlur, setFieldValue, handleChange, values, handleSubmit, touched, setFieldTouched, resetForm } = useFormik({
    initialValues: state,
    onSubmit: (values, actions) => postResolve(values, actions),
    validationSchema: yup.object().shape(schemaValidation),
  });

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      const innerSchema: { [key: string]: any } = {}

      if (props.requestDetail?.request?.request_actions?.id == 3) {
        innerSchema.text = yup.string().required(defaultString.requiredText)
      } else if (props.requestDetail?.request?.request_actions?.id == 1 || props.requestDetail?.request?.request_actions?.id == 7) {
        innerSchema.doc = yup.array().min(1, defaultString.requiredText).required(defaultString.requiredText)
      }

      setSchemaValidation(innerSchema)
      //function
      return () => {
        setSchemaValidation({})
        resetForm()
      }
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

  //componentDidUpdate
  useEffect(() => {
    if (mounted.current && props.postData?.success) {
      containerRef.current?.showSuccess()
    }
    return () => { }
  }, [props.postData])

  //componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    return () => { mounted.current = false }
  }, [])

  //Misc
  const postResolve = (values: RequestResolveState, actions: any) => {
    if (props.requestDetail?.request?.request_actions?.id == 1) {
      postDocumentResolve(values, actions)
    }
  }

  const postDocumentResolve = (values: RequestResolveState, actions: any) => {
    const _doc = values.doc?.map((field) => {
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
          "Documento de accion requerida"
        ],
        activity_id: props.requestDetail?.request?.activity?.activity_id,
        new_request: false,
      },
      label: "Documento de accion requerida",
      voucher: false,
      status: true,
      RequestID: props.requestDetail?.request?.id,
    }

    props.postDocumentResolve(request)
  }

  //Value change handlers
  const LocalSetFieldValue = (key: string) => (val: any) => {
    return setFieldValue(key, val)
  }

  const messages = localToArray(props.requestDetail?.request?.messages)

  //rendering
  return (
    <Container
      ref={containerRef}
      style={Styles.container}
      successMessage={props.route.params?.paymentComplete ? 'Pago realizado exitosamente' : 'Información enviada correctamente'}
      successFunction={() => props.route.params?.paymentComplete ? {} : props.navigation.goBack()}
    >
      <Header
        title={"Acción requerida"}
        leftIcon
      />
      <Content>
        <RequestHeader />
        <Separator />
        <Text style={Styles.title}>
          {tagToBold(messages[messages.length - 1]?.message)}
        </Text>
        <Separator />
        <CheckRender allowed={props.requestDetail?.request?.request_actions?.id == 1}>
          <Attach
            value={values?.doc}
            onValueChange={LocalSetFieldValue('doc')}
            // title={props.requestDetail?.request?.messages?.[0]?.message}
            buttonTitle={'Adjuntar'}
            buttonTheme='primaryOutline'
            bottomSeparate={false}
            options={['camera', 'library', 'document', 'myDocument']}
            showButton={!(localToArray(values?.doc).length)}
            showError={touched.doc && errors.doc}
          />
        </CheckRender>
        <CheckRender allowed={props.requestDetail?.request?.request_actions?.id == 3}>
          <Input
            value={values?.text}
            onValueChange={handleChange('text')}
            placeholder={props.requestDetail?.request?.request_actions?.name}
            onInputBlur={handleBlur("text")}
            showError={touched.text && errors.text}
            maxLength={144}
          />
        </CheckRender>
        <CheckRender allowed={props.requestDetail?.request?.request_actions?.id != 7}>
          <Button
            title='Envíar'
            theme='primaryOutline'
            onPress={handleSubmit}
            isLoading={props.postLoading}
          />
        </CheckRender>
        <CheckRender allowed={props.requestDetail?.request?.request_actions?.id == 7}>
          <Button
            title='Realizar pago'
            theme='primaryOutline'
            isLoading={props.postLoading}
            onPress={() => props.navigation.navigate('PaymentForm', {
              date: moment(props.requestDetail?.request?.created_at).format("DD [de] MMMM [de] YYYY"),
              businessName: 'Negocio de Prueba',
              requestId: props.requestDetail?.request?.id,
              servicePrice: localToString(props.requestDetail?.priceRequest[0].price),
              solicitudeId: localToString(props.requestDetail?.request?.code),
              serviceName: localToString(props.requestDetail?.request?.service?.name),
              authorizationId: localToString(props.requestDetail?.request?.idAutorizacionPortal),
              recaudationCode: localToString(props.requestDetail?.request?.service?.institution?.recaudationCode),
              siritCode: localToString(props.requestDetail?.request?.service?.sirit_code),
              from: 'RequestResolve',
            })}
          />
        </CheckRender>
      </Content>
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<HomeNavigatorParamList, 'RequestResolve'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  requestDetail: state.requestDetail.getData,

  postData: state.requestResolve.postData,
  postLoading: state.requestResolve.postLoading,
  postError: state.requestResolve.postError,
});

const mapDispatchToProps = {
  postRequestResolve: RequestResolveActions.postRequestResolve,
  postDocumentResolve: RequestResolveActions.postDocumentResolve,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(RequestResolve)