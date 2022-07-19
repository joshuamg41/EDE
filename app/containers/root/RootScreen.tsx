//@ts-nocheck
import { NavigationContainer } from "@react-navigation/native";
import moment from 'moment';
import 'moment/locale/es'; // without this line it didn't work
import React, { useEffect } from "react";
import { LogBox } from 'react-native';
import { Host } from 'react-native-portalize';
import { connect, ConnectedProps } from "react-redux";
import { isMountedRef, navigationRef } from "../../services/NavigationService";
import MainStackNavigator from "./navigators/MainNavigator";
import BackgroundTimer from 'react-native-background-timer';
import Config from 'react-native-config';
import { RootState } from "../../stores/AppReducers";
import SigninActions from '../../stores/signin/Actions';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaView } from "react-native-safe-area-context";
import ApplicationStyles from "../../themes/ApplicationStyles";

const RootScreen = (props: ScreenProps) => {
  useEffect(() => {
    isMountedRef.current = true;
    moment.locale('es')
    LogBox.ignoreAllLogs()
    return () => (isMountedRef.current = false);
  }, []);

  useEffect(() => {
    if (props.user.isLogged) {
      refreshTokenBackground()
    }
  }, [props.user.isLogged])

  //misc
  const refreshTokenBackground = () => {
    BackgroundTimer.setInterval(() => {
      props.refreshToken()
    }, Number(Config.TOKEN_TIMEOUT) || 3400000)
  }

  const onStateChange = (state) => {
    console.log('New Nav state is', state)
  }

  return (
    <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
      <Host>
        <MenuProvider>
          <SafeAreaView style={ApplicationStyles.flex1}>
            <MainStackNavigator />
          </SafeAreaView>
        </MenuProvider>
      </Host>
    </NavigationContainer>
  )
}

interface ScreenProps extends ReduxProps {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,
});

const mapDispatchToProps = {
  refreshToken: SigninActions.refreshToken,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(RootScreen)