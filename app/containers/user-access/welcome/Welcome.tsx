import {useFocusEffect} from '@react-navigation/core';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useState} from 'react';
import {ImageBackground, View} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import OneSignal from 'react-native-onesignal';
import RNSplashScreen from 'react-native-splash-screen';
import {connect, ConnectedProps} from 'react-redux';
import Images from '../../../assets/images';
import ButtonBack from '../../../components/button-back/ButtonBack';
import Button from '../../../components/button/Button';
import Container from '../../../components/container/Container';
import MiturLogo from '../../../components/mitur-logo/MiturLogo';
import CheckRender from '../../../components/security/CheckRender';
import Separator from '../../../components/separator/Separator';
import Text from '../../../components/text/Text';
import {RootState} from '../../../stores/AppReducers';
import SigninActions from '../../../stores/signin/Actions';
import {COLORS, METRICS} from '../../../themes';
import {MainNavigatorParamList} from '../../root/navigators/MainNavigator';
import ModalAccess from '../modal-access/ModalAccess';
import Styles from './WelcomeStyles';
import Config from 'react-native-config';

const Welcome = (props: ScreenProps) => {
  const [modalVisible, setModalVisible] = useState<string | boolean>(false);

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      props.destroyData();
      BackgroundTimer.stopBackgroundTimer();
      RNSplashScreen.hide();
      OneSignal.disablePush(true);
      // OneSignal.removeExternalUserId()
      return () => {
        setModalVisible(false);
      };
    }, [props.navigation]),
  );

  useFocusEffect(
    useCallback(() => {
      //function
      if (props.route.params?.comeFrom == 'ForgotPassword') {
        setModalVisible(true);
      }
      return () => {};
    }, [props.route.params]),
  );

  //rendering
  return (
    <Container>
      <ImageBackground
        source={Images.palm_background}
        style={Styles.imageBackground}
        resizeMode="cover">
        <CheckRender allowed={modalVisible}>
          <ButtonBack color={COLORS.white} />
        </CheckRender>
        <View
          style={[
            Styles.welcomeSection,
            modalVisible ? {justifyContent: 'flex-start'} : {},
          ]}>
          <MiturLogo />
          <CheckRender allowed={!modalVisible}>
            <Separator height={METRICS.xxLarge30} />
            <Text style={Styles.welcomeText}>APP DE SERVICIOS</Text>
          </CheckRender>
        </View>
        <View style={Styles.buttonSection}>
          <Button
            onPress={() => setModalVisible('Signin')}
            title="Iniciar sesión"
            theme="secondary"
          />
          <Button
            onPress={() => setModalVisible('Signup')}
            title="Registrarme"
            theme="primaryOutline"
            bottomSeparate={false}
          />

          <CheckRender allowed={Config.DEVELOP == 'TRUE'}>
            <Separator />
            <Text style={Styles.devText}>App en modo desarrollo v1.0.0</Text>
          </CheckRender>
        </View>
      </ImageBackground>
      <ModalAccess
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </Container>
  );
};

interface ScreenProps
  extends ReduxProps,
    StackScreenProps<MainNavigatorParamList, 'Welcome'> {}

const mapStateToProps = (state: RootState) => ({
  // user: state.signin.user,
});

const mapDispatchToProps = {
  destroyData: SigninActions.logoutDestroyData,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Welcome);
