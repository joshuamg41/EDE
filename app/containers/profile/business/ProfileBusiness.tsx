import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import { useFormik } from 'formik';
import update from 'immutability-helper';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect, ConnectedProps } from "react-redux";
import Button from '../../../components/button/Button';
import Container from '../../../components/container/Container';
import Content from '../../../components/content/Content';
import Header from '../../../components/header/Header';
import InfoSection from '../../../components/info-section/InfoSection';
import { RootState } from '../../../stores/AppReducers';
import { ProfileNavigatorParamList } from '../../root/navigators/flows/ProfileNavigator';
import { ProfileBusinessState, schemaValidation } from './ProfileBusinessConstants';
import Styles from './ProfileBusinessStyles';
import ProfileBusinessActions from "../../../stores/profile/business/Actions";
import SvgRender from '../../../components/svg-render/SvgRender';
import { COLORS, FONTS } from '../../../themes';
import { SVG } from '../../../assets';
import { cleanNumber, cleanString } from '../../../utils/StringUtil';
import CheckRender from '../../../components/security/CheckRender';
import Input from '../../../components/Input/Input';
import InputMasked from '../../../components/Input-masked/InputMasked';

const ProfileBusiness = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [state, setState] = useState<ProfileBusinessState>({
    businessName: undefined,
    businessAddress: undefined,
    businessRnc: undefined,
    businessPhone: undefined,
    businessUrl: undefined,
  })
  const { errors, handleChange, handleBlur, setFieldValue, values, touched, handleSubmit, resetForm } = useFormik({
    initialValues: state,
    onSubmit: (values, actions) => doRequest({ values, actions }),
    validationSchema: schemaValidation,
    enableReinitialize: true,
  })

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      setInitialState()
      return () => {
        setEditMode(!editMode)
      }
    }, [props.route])
  );

  //componentDidUpdate
  useEffect(() => {
    if (mounted.current && !isVisible && (props.updateError || props.updateData?.message)) {
      setIsVisible(true)
    }
    return () => { }
  }, [props.updateError, props.updateData]);

  //componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    return () => { mounted.current = false }
  }, [])

  //Value change handlers
  const onStateChange = (key: string, format?: (value: any) => string) => (value: any) => {
    return setState(prevState => update(prevState, { [key]: { $set: format ? format(value) : value } }));
  };

  //misc
  const setInitialState = () => {
    setState({
      ...state,
      businessName: props.route.params?.company_name,
      businessAddress: props.route.params?.company_address,
      businessRnc: props.route.params?.company_rnc,
      businessPhone: props.route.params?.company_phone,
      businessUrl: props.route.params?.company_url_web,
    })
  }

  const doRequest = ({ values, actions }: { values: ProfileBusinessState; actions: any }) => {
    const request = {
      idCompany: props.route.params?.id,
      company_name: cleanString(values.businessName),
      company_address: cleanString(values.businessAddress),
      company_rnc: cleanNumber(values.businessRnc),
      company_phone: cleanNumber(values.businessPhone),
      company_url_web: cleanString(values.businessUrl),
    }
    props.updateBusiness(request)
  }

  //rendering
  return (
    <Container
      style={Styles.container}
      modalProps={{
        isVisible: isVisible,
        onVisibleChange: setIsVisible,
      }}
      errorBody={props.updateError?.message || props.updateData?.message}
      errorContinue={() => props.navigation.goBack()}
    >
      <Header
        title={props.route.params?.company_name}
        leftIcon
        rightIcon={
          <SvgRender
            size={FONTS.mediumIcon}
            Svg={SVG.svg_edit}
            color={COLORS.primary}
          />
        }
        onPressRightIcon={() => setEditMode(!editMode)}
      />
      <Content style={Styles.content}>
        <InfoSection
          title='RNC'
          body={props.route.params?.company_rnc}
        />
        <CheckRender allowed={!editMode}>
          <InfoSection
            title='Direccion'
            body={props.route.params?.company_address}
          />
          <InfoSection
            title='Telefono'
            body={props.route.params?.company_phone}
          />
          <InfoSection
            title='URL'
            body={props.route.params?.company_url_web}
          />
          <InfoSection
            title='Propietario'
            body={props.route.params?.applicant_name}
          />
        </CheckRender>
        <CheckRender allowed={editMode}>
          <Input
            placeholder="Nombre de la compañía"
            value={values.businessName}
            onValueChange={handleChange('businessName')}
            onInputBlur={handleBlur("businessName")}
            showError={touched.businessName && errors.businessName}
          />
          <Input
            placeholder="Dirección de la compañía"
            value={values.businessAddress}
            onValueChange={handleChange('businessAddress')}
            onInputBlur={handleBlur("businessAddress")}
            showError={touched.businessAddress && errors.businessAddress}
          />
          <InputMasked
            placeholder="Teléfono de la compañía"
            value={values.businessPhone}
            onValueChange={handleChange('businessPhone')}
            onInputBlur={handleBlur("businessPhone")}
            showError={touched.businessPhone && errors.businessPhone}
            mask='phone'
          />
          <Input
            placeholder="Url del WebSite"
            value={values.businessUrl}
            onValueChange={handleChange('businessUrl')}
            onInputBlur={handleBlur("businessUrl")}
            showError={touched.businessUrl && errors.businessUrl}
            keyboardType='url'
          />
          <Button
            title='Guardar información'
            onPress={handleSubmit}
            isLoading={props.updateLoading}
          />
        </CheckRender>
      </Content>
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<ProfileNavigatorParamList, 'ProfileBusiness'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  updateData: state.profileBusiness.updateData,
  updateLoading: state.profileBusiness.updateLoading,
  updateError: state.profileBusiness.updateError,
});

const mapDispatchToProps = {
  updateBusiness: ProfileBusinessActions.updateBusiness,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(ProfileBusiness)