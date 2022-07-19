import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect, ConnectedProps } from "react-redux";
import ButtonText from '../../../components/button-text/ButtonText';
import Button from '../../../components/button/Button';
import Container from '../../../components/container/Container';
import Content from '../../../components/content/Content';
import InputMasked from '../../../components/Input-masked/InputMasked';
import Input from '../../../components/Input/Input';
import PickerSelect from '../../../components/picker-select/PickerSelect';
import CheckRender from '../../../components/security/CheckRender';
import Separator from '../../../components/separator/Separator';
import { documentTypeSelect } from '../../../services/LocalService';
import { navigateAndReset } from '../../../services/NavigationService';
import { RootState } from '../../../stores/AppReducers';
import SigninActions from '../../../stores/signin/Actions';
import { COLORS, FONTS, METRICS } from '../../../themes';
import { cleanNumber } from '../../../utils/NumberUtil';
import { safeValExtraction } from '../../../utils/ObjectUtil';
import { localToString } from '../../../utils/StringUtil';
import { MainNavigatorParamList } from '../../root/navigators/MainNavigator';
import { schemaValidation, SigninState } from './SigninConstants';
import Styles from './SigninStyles';

const Signin = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [state, setState] = useState<SigninState>({
    hidePassword: true,
    docType: undefined,
    docNumber: undefined,
    password: undefined,
    forgotDoc: undefined,
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
      return () => { }
    }, [props.navigation])
  );

  //componentDidUpdate
  useEffect(() => {
    if (mounted.current && props.error && !isVisible) {
      setIsVisible(true)
    }
    return () => { }
  }, [props.error])

  useEffect(() => {
    if (mounted.current && props.user.isLogged) {
      navigateAndReset('Pin');
    }
    return () => { }
  }, [props.user])

  //componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    return () => { mounted.current = false }
  }, [])

  //Misc
  const doRequest = (values: SigninState, actions: any) => {
    if (props.isLoading) {
      return
    }
    const request = {
      citizen_id: values.docType == "1" ? cleanNumber(values.docNumber) : values.docNumber,
      password: localToString(values?.password),
    }
    props.login(request)
  }

  //rendering
  return (
    <Container
      modalProps={{
        isVisible: isVisible,
        onVisibleChange: setIsVisible,
      }}
      errorBody={props.error?.message ?? "Usuario o contraseña incorrecta"}
    >
      <Content contentContainerStyle={Styles.content}>
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
            mask={safeValExtraction(values.docType) == 2 ? 'passport' : 'identification'}
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
          secureTextEntry={values.hidePassword}
          value={values.password}
          onValueChange={handleChange("password")}
          onInputBlur={handleBlur("password")}
          showError={touched.password && errors.password}
          placeholder="Contraseña"
          onEndEditing={handleSubmit}
          returnKeyType="done"
          rightSection={
            <Ionicons
              onPress={() => setFieldValue("hidePassword", !values.hidePassword)}
              name={values.hidePassword ? "eye" : "eye-off"}
              size={FONTS.mediumIcon}
              color={COLORS.primary}
            />
          }
        />
        <ButtonText
          onPress={() => props.navigation.navigate('ForgotPassword')}
          title="¿Olvidaste la contraseña?"
          theme="secondary"
          containerStyle={Styles.forgottenButton}
        />
        <Button
          // onPress={() => navigateAndReset('DrawerNavigator')}
          onPress={handleSubmit}
          isLoading={props.isLoading}
          title="Iniciar"
          theme='primary'
        />
      </Content>
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<MainNavigatorParamList, 'Signin'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,
  isLoading: state.signin.isLoading,
  error: state.signin.error,
});

const mapDispatchToProps = {
  login: SigninActions.login,
  cleanUp: SigninActions.signinCleanUp,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(Signin)