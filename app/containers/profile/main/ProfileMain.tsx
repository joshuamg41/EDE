import { useFocusEffect } from '@react-navigation/core';
import { DrawerScreenProps } from '@react-navigation/drawer';
import update from 'immutability-helper';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ImageBackground, TouchableHighlight, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { connect, ConnectedProps } from "react-redux";
import Images from '../../../assets/images';
import SVG from '../../../assets/svg/SVG';
import Container, { ContainerRef } from '../../../components/container/Container';
import ContentFlatList from '../../../components/content/ContentFlatList';
import Header from '../../../components/header/Header';
import HorizontalLine from '../../../components/horizontal-line/HorizontalLine';
import ListEmpty from '../../../components/list-empty/ListEmpty';
import RenderColumn from '../../../components/render/column/RenderColumn';
import Separator from '../../../components/separator/Separator';
import SvgRender from '../../../components/svg-render/SvgRender';
import Text from '../../../components/text/Text';
import UserPhoto from '../../../components/user-photo/UserPhoto';
import { navigateAndReset } from '../../../services/NavigationService';
import { RootState } from '../../../stores/AppReducers';
import ProfileMainActions from '../../../stores/profile/main/Actions';
import { COLORS, FONTS } from '../../../themes';
import { localToArray } from '../../../utils/ArrayUtil';
import DrawerItem from '../../root/drawer-menu/components/DrawerItem';
import { ProfileNavigatorParamList } from '../../root/navigators/flows/ProfileNavigator';
import ModalAddCompany from './components/ModalAddCompany';
import ModalChangeEmail from './components/ModalChangeEmail';
import ModalChangePassword from './components/ModalChangePassword';
import RenderBusiness from './components/RenderBusiness';
import { ProfileMainState } from './ProfileMainConstants';
import Styles from './ProfileMainStyles';

const ProfileMain = (props: ScreenProps) => {
  const mounted = useRef(false);
  const containerRef = useRef<ContainerRef>(null);
  const modalizeRef = useRef<Modalize>(null);
  const [state, setState] = useState<ProfileMainState>({})
  const [changePasswordVisible, setChangePasswordVisible] = useState<boolean>(false)
  const [changeEmailVisible, setChangeEmailVisible] = useState<boolean>(false)
  const [addCompanyVisible, setAddCompanyVisible] = useState<boolean>(false)

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      props.getProfileMain()
      return () => {
        modalizeRef.current?.close()
      }
    }, [props.navigation])
  );

  //componentDidUpdate
  useEffect(() => {
    if (mounted.current && (props.companyData.success || props.emailData.success || props.passwordData.success)) {
      successFunction()
      containerRef.current?.showSuccess()
      modalizeRef.current?.close()
    }
    return () => { }
  }, [props.companyData, props.emailData, props.passwordData])

  useEffect(() => {
    if (mounted.current && (props.companyError || props.emailError || props.passwordError)) {
      successFunction()
      containerRef.current?.showSuccess()
    }
    return () => { }
  }, [props.companyError, props.emailError, props.passwordError])

  //componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    return () => { mounted.current = false }
  }, [])

  //Misc
  const successMessage = useCallback(() => {
    if (addCompanyVisible) {
      return props.companyError?.message || props.companyData.message
    } else if (changeEmailVisible) {
      return props.emailError?.message || props.emailData.message
    } else if (changePasswordVisible) {
      return props.passwordError?.message || props.passwordData.message
    }
    return 'Creado exitosamente'
  }, [
    props.companyError, props.companyData, 
    props.emailError, props.emailData, 
    props.passwordError, props.passwordData
  ])

  const successFunction = () => {
    setChangePasswordVisible(false)
    setChangeEmailVisible(false)
    setAddCompanyVisible(false)
  }

  //Value change handlers
  const onStateChange = (key: string, format?: (value: any) => string) => (value: any) => {
    return setState(prevState => update(prevState, { [key]: { $set: format ? format(value) : value } }));
  };

  //rendering
  const HeaderComponent = () => {
    return (
      <>
        <View style={Styles.headerSection}>
          <ImageBackground
            source={Images.beach_background}
            resizeMode='cover'
          >
            <Header
              title='Mi Perfil'
              headerTitleStyle={Styles.headerTitle}
              onPressLeftIcon={props.navigation.toggleDrawer}
              onPressRightIcon={() => modalizeRef.current?.open()}
              iconName='menu'
              leftIcon
              leftIconColor={COLORS.white}
              rightIcon={
                <SvgRender
                  size={FONTS.mediumIcon}
                  Svg={SVG.svg_settings}
                  color={COLORS.white}
                />
              }
            />
            <UserPhoto />
            <Separator />
            <Text style={Styles.usernameTitle}>Hola, {props.user.data?.name}</Text>
            <Separator />
          </ImageBackground>
        </View>
        <Separator />
        <View style={Styles.bodySection}>
          <Text style={Styles.bodyTitle}>Mis datos</Text>
          <Separator />
          <TouchableHighlight
            style={Styles.myDataSection}
            underlayColor={COLORS.lightGray}
            onPress={() => props.navigation.navigate('ProfileEdit', {
              editMode: false,
            })}
          >
            <View>
              <RenderColumn
                title='Documento de Identidad'
                body={props.user.data?.citizen_id}
              />
              <RenderColumn
                title='Nombre completo'
                body={`${props.user.data?.name} ${props.user.data?.first_last_name} ${props.user.data?.second_last_name}`}
              />
              <RenderColumn
                title='Ciudad'
                body={props.user.data?.province}
              />
              <RenderColumn
                title='Correo Electrónico'
                body={props.user.data?.email}
                bottomSeparate={false}
              />
            </View>
          </TouchableHighlight>
          <Separator />
          <Text style={Styles.bodyTitle}>Mis empresas</Text>
          <Separator />
        </View>
      </>
    )
  }

  const LocalRenderBusiness = (itemProps: any) => {
    return (
      <RenderBusiness
        {...itemProps}
      />
    )
  }

  return (
    <Container
      ref={containerRef}
      style={Styles.container}
      successMessage={successMessage()}
      successFunction={successFunction}
      failure={!!props.emailError || !!props.companyError || !!props.passwordError}
    >
      <ContentFlatList
        data={localToArray(props.getData?.business)}
        renderItem={LocalRenderBusiness}
        ListHeaderComponent={HeaderComponent}
        ListEmptyComponent={
          <ListEmpty
            separator={false}
            isLoading={props.getLoading}
          />
        }
        contentContainerStyle={Styles.content}
      />
      <Portal>
        <Modalize
          ref={modalizeRef}
          // modalHeight={viewportHeight * 0.50}
          handlePosition='inside'
          handleStyle={Styles.handleStyle}
          adjustToContentHeight
        >
          <View style={Styles.modalizeContent}>
            <DrawerItem
              name="Editar Mis Datos"
              onPress={() => props.navigation.navigate('ProfileEdit', { editMode: true })}
              iconName='person-add-outline'
            />
            <DrawerItem
              name="Cambiar contraseña"
              onPress={() => setChangePasswordVisible(true)}
              iconName='key-outline'
            />
            <DrawerItem
              name="Cambiar email"
              onPress={() => setChangeEmailVisible(true)}
              iconName='mail-outline'
            />
            <DrawerItem
              name="Agregar Empresa"
              onPress={() => setAddCompanyVisible(true)}
              iconName='business'
            />
            <HorizontalLine marginHorizontal={0} />
            <DrawerItem
              onPress={() => navigateAndReset('Welcome')}
              name="Cerrar Sesión"
              iconName='log-out'
              iconStyle={{ color: COLORS.error }}
            />
          </View>
        </Modalize>
      </Portal>
      <ModalChangePassword
        isVisible={changePasswordVisible}
        onVisibleChange={setChangePasswordVisible}
      />
      <ModalChangeEmail
        isVisible={changeEmailVisible}
        onVisibleChange={setChangeEmailVisible}
      />
      <ModalAddCompany
        isVisible={addCompanyVisible}
        onVisibleChange={setAddCompanyVisible}
      />
    </Container>
  )
}

interface ScreenProps extends ReduxProps, DrawerScreenProps<ProfileNavigatorParamList, 'ProfileMain'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  getData: state.profileMain.getData,
  getLoading: state.profileMain.getLoading,
  getError: state.profileMain.getError,

  companyData: state.profileMain.newCompanyData,
  companyError: state.profileMain.newCompanyError,

  emailData: state.profileMain.newEmailData,
  emailError: state.profileMain.newEmailError,

  passwordData: state.profileMain.newPasswordData,
  passwordError: state.profileMain.newPasswordError,
});

const mapDispatchToProps = {
  getProfileMain: ProfileMainActions.getProfileMain,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(ProfileMain)