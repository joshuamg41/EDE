import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import { useFormik } from 'formik';
import update from 'immutability-helper';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { connect, ConnectedProps } from "react-redux";
import { SVG } from '../../../assets';
import Button from '../../../components/button/Button';
import Container, { ContainerRef } from '../../../components/container/Container';
import Content from '../../../components/content/Content';
import ErrorContainer from '../../../components/error-container/ErrorContainer';
import Header from '../../../components/header/Header';
import InfoSection from '../../../components/info-section/InfoSection';
import InputArea from '../../../components/Input-area/InputArea';
import InputMasked from '../../../components/Input-masked/InputMasked';
import ModalPicker from '../../../components/modal-picker/ModalPicker';
import CheckRender from '../../../components/security/CheckRender';
import SvgRender from '../../../components/svg-render/SvgRender';
import { navigateAndReset } from '../../../services/NavigationService';
import { RootState } from '../../../stores/AppReducers';
import ProfileEditActions from '../../../stores/profile/edit/Actions';
import { COLORS, FONTS } from '../../../themes';
import { filterObject } from '../../../utils/ObjectUtil';
import { cleanNumber, formatPhoneNumber } from '../../../utils/StringUtil';
import { ProfileNavigatorParamList } from '../../root/navigators/flows/ProfileNavigator';
import { ProfileEditState, schemaValidation } from './ProfileEditConstants';
import Styles from './ProfileEditStyles';

const ProfileEdit = (props: ScreenProps) => {
  const mounted = useRef(false);
  const containerRef = useRef<ContainerRef>(null);
  const [editMode, setEditMode] = useState<boolean>(!!props.route.params?.editMode)
  const [state, setState] = useState<ProfileEditState>({
    cellPhone: undefined,
    phone: undefined,
    province: undefined,
    municipality: undefined,
    sector: undefined,
    address: undefined,
  });
  const { errors, handleBlur, setFieldValue, handleChange, values, handleSubmit, touched, setFieldTouched } = useFormik({
    initialValues: state,
    enableReinitialize: true,
    onSubmit: (values, actions) => doRequest(values, actions),
    validationSchema: schemaValidation,
  });

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      if (editMode) {
        props.setProfileFields()
      }
      //function
      return () => { }
    }, [props.navigation])
  );

  //componentDidUpdate
  useEffect(() => {
    if (mounted.current && !props.provinceLoading && !props.municipalityLoading && !props.sectorLoading) {
      setInitialState()
    }
    return () => { }
  }, [props.provinceLoading, props.municipalityLoading, props.sectorLoading])

  useEffect(() => {
    if (mounted.current && (props.postError?.message || props.deleteError?.message)) {
      containerRef.current?.showSuccess()
    }
    return () => { }
  }, [props.postError, props.deleteError]);

  useEffect(() => {
    if (mounted.current && (props.postData?.success || props.deleteData?.success)) {
      containerRef.current?.showSuccess()
    }
    return () => { }
  }, [props.postData, props.deleteData]);

  //componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    return () => { mounted.current = false }
  }, [])

  //Misc
  const setInitialState = () => {
    setState({
      ...state,
      cellPhone: formatPhoneNumber(props.user.data?.phone),
      phone: formatPhoneNumber(props.user.data?.phone2),
      address: props.user.data?.address,
      province: filterObject(props.provinceData, "Value", props.user.data?.province_id),
      municipality: filterObject(props.municipalityData, "Value", props.user.data?.municipality_id),
      sector: filterObject(props.sectorData, "Value", props.user.data?.sector_id),
    })
  }

  const doRequest = (values: ProfileEditState, actions: any) => {
    const request = {
      phone: cleanNumber(values.cellPhone),
      phone2: cleanNumber(values.phone),
      province_id: values.province?.Id,
      municipality_id: values.municipality?.Id,
      sector_id: values.sector?.Id,
      address: values.address,
    }
    props.postUpdateCitizen(request)
  }

  const confirmDelete = () => {
    Alert.alert(
      'Alerta',
      '¿Estás seguro que deseas eliminar tu cuenta?',
      [
        { text: 'No' },
        { text: 'Sí', onPress: props.deleteUser }
      ],
      {
        cancelable: false,
      })
  }

  const successFunction = () => {
    if (props.deleteData.success) {
      navigateAndReset('Welcome')
      return
    }
    setEditMode(false)
  }

  //Value change handlers
  const onStateChange = (key: string, format?: (value: any) => string) => (value: any) => {
    return setState(prevState => update(prevState, { [key]: { $set: format ? format(value) : value } }));
  };

  const successMessage = useCallback(() => {
    if (props.postError || props.deleteError) {
      return props.postError?.message || props.deleteError?.message
    } else if (props.deleteData.success) {
      return props.deleteData.message
    } else {
      return 'Información enviada correctamente'
    }
  }, [props.deleteData, props.postError, props.deleteError])

  //Rendering
  return (
    <Container
      ref={containerRef}
      style={Styles.container}
      successMessage={successMessage()}
      successFunction={successFunction}
      failure={!!(props.postError || props.deleteError)}
    >
      <Header
        title={`${props.user.data?.name} ${props.user.data?.first_last_name}`}
        leftIcon
        rightIcon={
          <CheckRender allowed={props.route.params?.editMode}>
            <SvgRender
              size={FONTS.mediumIcon}
              Svg={SVG.svg_edit}
              color={COLORS.primary}
            />
          </CheckRender>
        }
        onPressRightIcon={() => setEditMode(!editMode)}
        disableRightIcon={!props.route.params?.editMode}
      />
      <Content style={Styles.body}>
        <InfoSection
          title='Documento De Identidad:'
          body={props.user.data?.citizen_id}
        />
        <InfoSection
          title='Correo Electrónico:'
          body={props.user.data?.email}
        />
        <CheckRender allowed={!editMode}>
          <InfoSection
            title='Celular:'
            body={formatPhoneNumber(props.user.data?.phone)}
          />
          <InfoSection
            title='Teléfono:'
            body={formatPhoneNumber(props.user.data?.phone2)}
          />
          <InfoSection
            title='Provincia:'
            body={props.user.data?.province}
          />
          <InfoSection
            title='Municipio:'
            body={props.user.data?.municipality}
          />
          <InfoSection
            title='Sector:'
            body={props.user.data?.sector}
          />
          <InfoSection
            title='Dirección:'
            body={props.user.data?.address}
          />
          <Button
            title='Eliminar cuenta'
            theme='errorOutline'
            onPress={confirmDelete}
            isLoading={props.deleteLoading}
          />
        </CheckRender>
        <ErrorContainer
          isLoading={false}
          showDE={editMode}
        >
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
            data={props.provinceData}
            placeholder="Provincia"
            value={values.province}
            onValueChange={(value) => {
              setFieldValue('province', value)
              setFieldValue('municipality', undefined)
              setFieldValue('sector', undefined)
              props.getMunicipality(value?.Value)
            }}
            showError={touched.province && errors.province}
          />
          <ModalPicker
            data={props.municipalityData}
            placeholder="Municipio"
            value={values.municipality}
            onValueChange={(value) => {
              setFieldValue('municipality', value)
              setFieldValue('sector', undefined)
              props.getSector(value?.Value)
            }}
            disabled={!values.province}
            showError={touched.municipality && errors.municipality}
          />
          <ModalPicker
            data={props.sectorData}
            placeholder="Sector"
            disabled={!values.municipality}
            value={values.sector}
            onValueChange={(value) => setFieldValue('sector', value)}
            showError={touched.sector && errors.sector}
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
          <Button
            title='Guardar'
            onPress={handleSubmit}
            isLoading={props.postLoading}
          />
        </ErrorContainer>
      </Content>
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<ProfileNavigatorParamList, 'ProfileEdit'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  provinceData: state.profileEdit.provinceData,
  provinceLoading: state.profileEdit.provinceLoading,
  provinceError: state.profileEdit.provinceError,

  municipalityData: state.profileEdit.municipalityData,
  municipalityLoading: state.profileEdit.municipalityLoading,
  municipalityError: state.profileEdit.municipalityError,

  sectorData: state.profileEdit.sectorData,
  sectorLoading: state.profileEdit.sectorLoading,
  sectorError: state.profileEdit.sectorError,

  postData: state.profileEdit.updateCitizenData,
  postLoading: state.profileEdit.updateCitizenLoading,
  postError: state.profileEdit.updateCitizenError,

  deleteData: state.profileEdit.deleteData,
  deleteLoading: state.profileEdit.deleteLoading,
  deleteError: state.profileEdit.deleteError,
});

const mapDispatchToProps = {
  getProvince: ProfileEditActions.getProvince,
  getMunicipality: ProfileEditActions.getMunicipality,
  getSector: ProfileEditActions.getSector,
  setProfileFields: ProfileEditActions.setProfileFields,
  postUpdateCitizen: ProfileEditActions.postUpdateCitizen,
  deleteUser: ProfileEditActions.deleteUser,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(ProfileEdit)