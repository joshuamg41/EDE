import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback } from "react";
import TouchID from 'react-native-touch-id';
import { connect, ConnectedProps } from 'react-redux';
import { isMountedRef, navigateAndReset } from "../../../services/NavigationService";
import { RootState } from "../../../stores/AppReducers";
import deviceStorage from '../../../stores/DeviceStorage';
import WalkthroughActions from '../../../stores/walkthrough/Actions';
import { MainNavigatorParamList } from '../navigators/MainNavigator';
import LoadingImage from './components/LoadingImage';

const SplashScreen = (props: ScreenProps) => {
  useFocusEffect(
    useCallback(() => {
      setTimeout(async () => {
        //DrawerNavigator UserAccessNavigator
        if (props.user.isLogged) {
          if (props.user.pin?.length != 4) {
            navigateAndReset('Pin')
            return
          }
          TouchID.isSupported()
            .then(success => {
              navigateAndReset('FaceId', { touchSupported: true, from: props.route.params?.from })
            })
            .catch(error => {
              navigateAndReset('Pin', { touchSupported: false, from: props.route.params?.from })
            })
        } else {
          const viewWalkthrough = await deviceStorage.getItem('walkthrought')
          if(viewWalkthrough){
            navigateAndReset('Welcome')
          } else {
            props.getWalkthrough()
          }
        }
      }, 500)
      return () => { }
    }, [props.navigation, isMountedRef])
  )

  return (
    <LoadingImage />
  );
}

interface ScreenProps extends ReduxProps, StackScreenProps<MainNavigatorParamList, 'SplashScreen'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,
});

const mapDispatchToProps = {
  getWalkthrough: WalkthroughActions.getWalkthrough,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(SplashScreen)