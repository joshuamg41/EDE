import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect, ConnectedProps } from "react-redux";
import Button from '../../../components/button/Button';
import Container, { ContainerRef } from '../../../components/container/Container';
import Content from '../../../components/content/Content';
import InputArea from '../../../components/Input-area/InputArea';
import InputMasked from '../../../components/Input-masked/InputMasked';
import Input from '../../../components/Input/Input';
import ModalPicker from '../../../components/modal-picker/ModalPicker';
import Modal from '../../../components/modal/Modal';
import PickerSelect from '../../../components/picker-select/PickerSelect';
import CheckRender from '../../../components/security/CheckRender';
import Separator from '../../../components/separator/Separator';
import Text from '../../../components/text/Text';
import { documentTypeSelect } from '../../../services/LocalService';
import { SignupRequest } from '../../../services/signup/SignupServiceConstants';
import { RootState } from '../../../stores/AppReducers';
import SignupActions from '../../../stores/signup/Actions';
import { COLORS, FONTS, METRICS } from '../../../themes';
import ApplicationStyles from '../../../themes/ApplicationStyles';
import { cleanNumber } from '../../../utils/NumberUtil';
import { cleanString, localToString } from '../../../utils/StringUtil';
import { MainNavigatorParamList } from '../../root/navigators/MainNavigator';
import SecurityForm from './components/SecurityForm';
import TermsAndConditions from './components/TermsAndConditions';
import { schemaValidation, SignupState } from './SignupConstants';
import Styles from './SignupStyles';

const Signup = (props: ScreenProps) => {
  const mounted = useRef(false);
  const containerRef = useRef<ContainerRef>(null);
  const contentRef = useRef<KeyboardAwareScrollView>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [termsVisible, setTermsVisible] = useState<boolean>(false);
  const [questionVisible, setQuestionVisible] = useState<any>(false);
  const [state, setState] = useState<SignupState>({
    docType: undefined,
    docNumber: undefined,
    email: undefined,
    name: undefined,
    firstLastName: undefined,
    secondLastName: undefined,
    province: undefined,
    municipality: undefined,
    sector: undefined,
    address: undefined,
    jobTitle: undefined,
    cellPhone: undefined,
    phone: undefined,
    hidePassword: true,
    password: undefined,
    hidePasswordRetry: true,
    passwordRetry: undefined,
  })
  const { errors, handleBlur, setFieldValue, handleChange, values, handleSubmit, touched, setFieldTouched, resetForm, setFieldError } = useFormik({
    initialValues: state,
    onSubmit: (values, actions) => doRequest(values, actions),
    validationSchema: schemaValidation,
  });

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      props.getSignup()
      //function
      return () => { }
    }, [props.navigation])
  );

  //componentDidUpdate
  useEffect(() => {
    if (mounted.current && props.documentData) {
      if(props.documentData.exist) {
        setFieldError('docNumber', undefined)
      } else {
        setFieldError('docNumber', 'Cédula no válida, introduzca otra cédula')
      }
    }
    return () => { }
  }, [props.documentData])

  useEffect(() => {
    if (mounted.current && props.postError?.message) {
      setIsVisible(true)
    }
    return () => { }
  }, [props.postError])

  useEffect(() => {
    if (mounted.current && props.postData?.message) {
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
  const doRequest = (values: SignupState, actions: any) => {
    const request: SignupRequest = {
      citizen_id: values.docType == "1" ? cleanNumber(values.docNumber) : cleanString(values.docNumber),
      document_type: localToString(values.docType),
      email: cleanString(values.email),
      name: cleanString(values.name),
      first_last_name: cleanString(values.firstLastName),
      second_last_name: cleanString(values.secondLastName),
      occupation: cleanString(values.jobTitle),
      password: cleanString(values.password),
      password_confirmation: cleanString(values.passwordRetry),
      province_id: values.province?.Value,
      municipality_id: values.municipality?.Value,
      sector_id: values.sector?.Value,
      phone: cleanNumber(values.cellPhone),
      phone2: cleanNumber(values.phone),
      address: cleanString(values.address),
    }
    setQuestionVisible(request)
  }

  const validateDocument = () => {
    const request = {
      citizen_id: cleanNumber(values.docNumber),
    }
    props.getDocumentValidate(request)
  }

  const onSuccessEnd = () => {
    resetForm()
    setQuestionVisible(false)
  }

  //Value change handlers
  const onStateChange = (key: string) => (value: any) => {
    return setFieldValue(key, value)
  };

  const onBlur = (key: string) => () => {
    if(key == 'docNumber'){
      validateDocument()
    }
    return setFieldTouched(key)
  };

  //rendering
  return (
    <Container
      ref={containerRef}
      modalProps={{
        isVisible: isVisible,
        onVisibleChange: setIsVisible,
      }}
      errorBody={props.postError?.message}
      successFunction={onSuccessEnd}
      successMessage={props.postData?.message}
    >
      <Content
        contentContainerStyle={Styles.content}
        keyboardShouldPersistTaps='always'
        //@ts-ignore
        scrollRef={contentRef}
      >
        <Separator height={METRICS.xxLarge30} />
        <PickerSelect
          data={documentTypeSelect}
          iconName="document-text"
          value={values.docType}
          onValueChange={onStateChange('docType')}
          placeholder="Tipo de documento"
          onPickerBlur={onBlur('docType')}
          showError={touched.docType && errors.docType}
        />
        <CheckRender allowed={values.docType != '2'}>
          <InputMasked
            iconName="person"
            placeholder="Número de documento"
            mask='identification'
            value={values.docNumber}
            onValueChange={handleChange('docNumber')}
            onInputBlur={onBlur("docNumber")}
            showError={touched.docNumber && errors.docNumber}
            editable={!!values.docType}
            isLoading={!!props.documentLoading}
          />
        </CheckRender>
        <CheckRender allowed={values.docType == '2'}>
          <Input
            iconName="person"
            placeholder="Número de documento"
            value={values.docNumber}
            onValueChange={handleChange('docNumber')}
            onInputBlur={handleBlur("docNumber")}
            showError={touched.docNumber && errors.docNumber}
            editable={!!values.docType}
            maxLength={9}
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
        <Input
          placeholder="Nombres"
          value={values.name}
          onValueChange={handleChange('name')}
          onInputBlur={handleBlur("name")}
          showError={touched.name && errors.name}
          maxLength={27}
          textContentType='givenName'
        />
        <View style={ApplicationStyles.fieldRow}>
          <Input
            placeholder="Primer apellido"
            value={values.firstLastName}
            onValueChange={handleChange('firstLastName')}
            onInputBlur={handleBlur("firstLastName")}
            showError={touched.firstLastName && errors.firstLastName}
            maxLength={27}
            textContentType='familyName'
            widthSeparator={0}
            bottomSeparate={false}
            containerStyle={ApplicationStyles.flex1}
          />
          <Separator />
          <Input
            placeholder="Segundo apellido"
            value={values.secondLastName}
            onValueChange={handleChange('secondLastName')}
            onInputBlur={handleBlur("secondLastName")}
            showError={touched.secondLastName && errors.secondLastName}
            maxLength={27}
            widthSeparator={0}
            bottomSeparate={false}
            containerStyle={ApplicationStyles.flex1}
          />
        </View>
        <Separator />
        <Input
          placeholder="Ocupación"
          value={values.jobTitle}
          onValueChange={handleChange('jobTitle')}
          onInputBlur={handleBlur("jobTitle")}
          showError={touched.jobTitle && errors.jobTitle}
          maxLength={27}
          textContentType='jobTitle'
        />
        <InputMasked
          value={values.cellPhone}
          onValueChange={handleChange("cellPhone")}
          onInputBlur={handleBlur("cellPhone")}
          showError={touched.cellPhone && errors.cellPhone}
          placeholder='Celular'
          mask='phone'
        />
        <InputMasked
          value={values.phone}
          onValueChange={handleChange("phone")}
          onInputBlur={handleBlur("phone")}
          showError={touched.phone && errors.phone}
          placeholder='Teléfono'
          mask='phone'
        />
        <ModalPicker
          data={props.signupData.provinceData}
          placeholder="Provincia"
          value={values.province}
          onPickerBlur={onBlur('province')}
          onValueChange={(value) => {
            setFieldValue('province', value)
            setFieldValue('municipality', undefined)
            setFieldValue('sector', undefined)
            props.getMunicipality(value?.Value)
          }}
          isLoading={props.signupLoading}
          showError={touched.province && errors.province}
        />
        <ModalPicker
          data={props.municipalityData}
          placeholder="Municipio"
          value={values.municipality}
          onPickerBlur={onBlur('municipality')}
          onValueChange={(value) => {
            setFieldValue('municipality', value)
            setFieldValue('sector', undefined)
            props.getSector(value?.Value)
          }}
          isLoading={props.municipalityLoading}
          disabled={!values.province}
          showError={touched.municipality && errors.municipality}
        />
        <ModalPicker
          data={props.sectorData}
          placeholder="Sector"
          disabled={!values.municipality}
          value={values.sector}
          onPickerBlur={onBlur('sector')}
          onValueChange={(value) => setFieldValue('sector', value)}
          showError={touched.sector && errors.sector}
          isLoading={props.sectorLoading}
        />
        <InputArea
          placeholder="Dirección"
          value={values.address}
          onValueChange={handleChange('address')}
          onInputBlur={handleBlur("address")}
          showError={touched.address && errors.address}
          maxLength={200}
          textContentType='fullStreetAddress'
        />
        <Input
          secureTextEntry={values.hidePassword}
          placeholder="Contraseña"
          iconName="lock-closed"
          value={values.password}
          onValueChange={handleChange("password")}
          onInputBlur={handleBlur("password")}
          showError={touched.password && errors.password}
          textContentType='password'
          autoCapitalize='none'
          rightSection={
            <Ionicons
              onPress={() => setFieldValue("hidePassword", !values.hidePassword)}
              name={values.hidePassword ? "eye" : "eye-off"}
              size={FONTS.mediumIcon}
              color={COLORS.primary}
            />
          }
        />
        <Input
          secureTextEntry={values.hidePasswordRetry}
          placeholder="Repetir contraseña"
          iconName="lock-closed"
          value={values.passwordRetry}
          onValueChange={handleChange("passwordRetry")}
          onInputBlur={handleBlur("passwordRetry")}
          showError={touched.passwordRetry && errors.passwordRetry}
          returnKeyType="done"
          textContentType='password'
          autoCapitalize='none'
          rightSection={
            <Ionicons
              onPress={() => setFieldValue("hidePasswordRetry", !values.hidePasswordRetry)}
              name={values.hidePasswordRetry ? "eye" : "eye-off"}
              size={FONTS.mediumIcon}
              color={COLORS.primary}
            />
          }
        />
        <Text style={Styles.firstTermsSentence}>Al registrarte en Ministerio de Turismo estas aceptando los</Text>
        <Separator height={METRICS.small5} />
        <Text onPress={() => setTermsVisible(true)} style={Styles.secondTermsSentence}>Términos y condiciones</Text>
        <Separator height={METRICS.large15} />
        <Button
          onPress={handleSubmit}
          title="Siguiente"
          theme="primary"
          isLoading={props.postLoading}
        />
      </Content>
      <Modal
        isVisible={termsVisible}
        onVisibleChange={setTermsVisible}
        innerContent={{paddingHorizontal: 0, paddingVertical: 0}}
      >
        <TermsAndConditions setTermsVisible={setTermsVisible} />
      </Modal>
      <SecurityForm
        isVisible={questionVisible}
        onVisibleChange={setQuestionVisible}
      />
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<MainNavigatorParamList, 'Signup'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  signupData: state.signup.signupData,
  signupLoading: state.signup.signupLoading,
  signupError: state.signup.signupError,

  documentData: state.signup.documentData,
  documentLoading: state.signup.documentLoading,
  documentError: state.signup.documentError,

  municipalityData: state.signup.municipalityData,
  municipalityLoading: state.signup.municipalityLoading,
  municipalityError: state.signup.municipalityError,

  sectorData: state.signup.sectorData,
  sectorLoading: state.signup.sectorLoading,
  sectorError: state.signup.sectorError,

  postData: state.signup.postData,
  postLoading: state.signup.postLoading,
  postError: state.signup.postError,
});

const mapDispatchToProps = {
  postRegister: SignupActions.postRegister,
  getDocumentValidate: SignupActions.getDocumentValidate,
  getSignup: SignupActions.getSignup,
  getMunicipality: SignupActions.getMunicipality,
  getSector: SignupActions.getSector,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(Signup)