import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import { useFormik } from 'formik';
import update from 'immutability-helper';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler, View } from 'react-native';
import { connect, ConnectedProps } from "react-redux";
import Button from '../../../components/button/Button';
import Container, { ContainerRef } from '../../../components/container/Container';
import Content from '../../../components/content/Content';
import Header from '../../../components/header/Header';
import InputMasked from '../../../components/Input-masked/InputMasked';
import Input from '../../../components/Input/Input';
import PickerSelect from '../../../components/picker-select/PickerSelect';
import CheckRender from '../../../components/security/CheckRender';
import Separator from '../../../components/separator/Separator';
import Text from '../../../components/text/Text';
import { documentTypeSelect } from '../../../services/LocalService';
import { RootState } from '../../../stores/AppReducers';
import { METRICS } from '../../../themes';
import { MainNavigatorParamList } from '../../root/navigators/MainNavigator';
import { ForgotPasswordState, schemaValidation } from './ForgotPasswordConstants';
import Styles from './ForgotPasswordStyles';
import SigninActions from '../../../stores/signin/Actions';
import { cleanNumber } from '../../../utils/StringUtil';

const ForgotPassword = (props: ScreenProps) => {
  const mounted = useRef(false);
  const containerRef = useRef<ContainerRef>(null);
  const [state, setState] = useState<ForgotPasswordState>({
    docType: undefined,
    docNumber: undefined,
    email: undefined,
  })
  const { errors, handleBlur, setFieldValue, handleChange, values, handleSubmit, touched, setFieldTouched, resetForm } = useFormik({
    initialValues: state,
    onSubmit: (values, actions) => doRequest(values, actions),
    validationSchema: schemaValidation,
  });

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backPress
      )
      return () => {
        backHandler.remove()
      }
    }, [props.navigation])
  );

  //componentDidUpdate
  useEffect(() => {
    if (mounted.current && props.forgotData?.msg ) {
      containerRef.current?.showSuccess()
    }
    return () => { }
  }, [props.forgotData])

  //componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    return () => { mounted.current = false }
  }, [])

  //Misc
  const backPress = () => {
    props.navigation.navigate('Welcome', {
      comeFrom: 'ForgotPassword'
    })
    return true
  }

  //Misc
  const doRequest = (values: ForgotPasswordState, actions: any) => {
    const request = {
      email: values.email,
      citizen_id: values.docType == "1" ? cleanNumber(values.docNumber) : values.docNumber,
    }
    props.callForgotPassword(request)
  }

  const onEndAnimation = () => {
    if(props.forgotData.success){
      props.navigation.goBack()
    }
  }

  //Value change handlers
  const onStateChange = (key: string, format?: (value: any) => string) => (value: any) => {
    return setState(prevState => update(prevState, { [key]: { $set: format ? format(value) : value } }));
  };

  //rendering
  return (
    <Container
      ref={containerRef}
      style={Styles.container}
      successMessage={props.forgotData?.msg ||'Correo envíado exitosamente'}
      successFunction={onEndAnimation}
      failure={!props.forgotData.success}
    >
      <Content
        contentContainerStyle={Styles.content}
      >
        <Header
          leftIcon
          onPressLeftIcon={backPress}
          containerStyle={Styles.header}
        />
        <View style={Styles.titleSection}>
          <Text style={Styles.title}>¿Olvidaste la</Text>
          <Text style={Styles.title}>contraseña?</Text>
          <Separator />
          <Text style={Styles.subTitle}>Introduce tu correo y recibirás un</Text>
          <Text style={Styles.subTitle}>enlace para recuperar la contraseña</Text>
        </View>
        <Separator height={METRICS.xxLarge30} />
        <PickerSelect
          data={documentTypeSelect}
          iconName="document-text"
          value={values.docType}
          onValueChange={(value) => setFieldValue('docType', value)}
          placeholder="Tipo de documento"
          onPickerBlur={() => setFieldTouched('docType')}
          showError={touched.docType && errors.docType}
        />
        <CheckRender allowed={values.docType != '2'}>
          <InputMasked
            iconName="person"
            placeholder='Número de documento'
            mask={'identification'}
            value={values.docNumber}
            onValueChange={handleChange("docNumber")}
            onInputBlur={handleBlur("docNumber")}
            showError={touched.docNumber && errors.docNumber}
          />
        </CheckRender>
        <CheckRender allowed={values.docType == '2'}>
          <Input
            iconName="person"
            placeholder='Número de pasaporte'
            value={values.docNumber}
            onValueChange={handleChange('docNumber')}
            onInputBlur={handleBlur("docNumber")}
            showError={touched.docNumber && errors.docNumber}
            maxLength={11}
          />
        </CheckRender>
        <Input
          iconName="mail-outline"
          placeholder="Correo"
          value={values.email}
          onValueChange={handleChange('email')}
          onInputBlur={handleBlur("email")}
          showError={touched.email && errors.email}
          maxLength={320}
          keyboardType="email-address"
          textContentType='emailAddress'
          autoCapitalize='none'
        />
        <Button
          title='Recuperar Contraseña'
          theme='primaryOutline'
          onPress={handleSubmit}
          bottomSeparate={false}
          isLoading={props.forgotLoading}
        />
      </Content>
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<MainNavigatorParamList, 'ForgotPassword'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  forgotData: state.signin.forgotData,
  forgotLoading: state.signin.forgotLoading,
  forgotError: state.signin.forgotError,
});

const mapDispatchToProps = {
  callForgotPassword: SigninActions.callForgotPassword,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(ForgotPassword)