import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import update from 'immutability-helper';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, RefreshControl, View } from 'react-native';
import PinView, { PinViewProps } from 'react-native-pin-view';
import RNSplashScreen from 'react-native-splash-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect, ConnectedProps } from "react-redux";
import ButtonBack from '../../../components/button-back/ButtonBack';
import Container from '../../../components/container/Container';
import Content from '../../../components/content/Content';
import CheckRender from '../../../components/security/CheckRender';
import Separator from '../../../components/separator/Separator';
import Text from '../../../components/text/Text';
import { navigateAndReset } from '../../../services/NavigationService';
import { RootState } from '../../../stores/AppReducers';
import SigninActions from '../../../stores/signin/Actions';
import { COLORS } from '../../../themes';
import { RefreshControlBaseProps } from '../../../utils/ConstantsUtil';
import { localToString } from '../../../utils/StringUtil';
import { moderateScale } from '../../../utils/StyleHelpers';
import { MainNavigatorParamList } from '../../root/navigators/MainNavigator';
import { PinState } from './PinConstants';
import Styles from './PinStyles';

const Pin = (props: ScreenProps) => {
  const mounted = useRef(false);
  const pinView = useRef<PinViewProps>(null);
  const canGoBack = props.navigation.canGoBack();
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const newPinSetting = props.user.pin?.length != 4
  const [localLoading, setLocalLoading] = useState<boolean>(false)
  const [step, setStep] = useState<number>(1)
  const [error, setError] = useState<boolean>(false)
  const [state, setState] = useState<PinState>({
    pin: undefined,
    pinRetry: undefined,
  })

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      RNSplashScreen.hide()
      return () => { }
    }, [props.navigation])
  );

  //componentDidUpdate
  useEffect(() => {
    if (mounted.current && props.error && !localLoading) {
      navigateAndReset('Welcome')
      setLocalLoading(!localLoading)
    }
    return () => { }
  }, [props.error])

  useEffect(() => {
    if (mounted.current && props.user.isLogged && !localLoading) {
      if(props.route.params?.from){
        navigateAndReset(props.route.params?.from)
      } else {
        navigateAndReset('DrawerNavigator')
      }
      setLocalLoading(!localLoading)
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
  const doRequest = () => {
    if (props.isLoading) {
      return
    }
    props.login(props.user.authRequest)
  }

  const onButtonPress = (key: string) => {
    switch (key) {
      case "custom_left":
        navigateAndReset('Welcome')
        break;
      case "custom_right":
        // @ts-ignore
        pinView?.current?.clear()
        break;
      default:
        break;
    }
  }

  const handleError = () => {
    setError(true)
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: moderateScale(20), duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: moderateScale(-20), duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: moderateScale(20), duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: moderateScale(-20), duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: moderateScale(20), duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true })
    ]).start();
    setTimeout(() => setError(false), 1000)
  }

  const validatePin = (pin: string) => {
    //new pin configuration
    if (newPinSetting) {
      // @ts-ignore
      pinView?.current?.clearAll()
      setStep(2)
      return
    }

    if (pin == localToString(props.user?.pin)) {
      // @ts-ignore
      pinView?.current?.clearAll()
      doRequest()
    } else {
      // @ts-ignore
      pinView?.current?.clearAll()
      handleError()
    }
  }

  const validatePinRetry = (pin: string) => {
    //new pin configuration
    if (state.pin == pin) {
      // @ts-ignore
      pinView?.current?.clearAll()
      props.setPin(pin)
      if(props.route.params?.from){
        navigateAndReset(props.route.params?.from)
      } else {
        navigateAndReset('DrawerNavigator')
      }
    } else {
      // @ts-ignore
      pinView?.current?.clearAll()
      handleError()
      setStep(1)
    }
  }

  //Value change handlers
  const onStateChange = (key: string, format?: (value: any) => string) => (value: any) => {
    if (key == 'pin' && localToString(value).length == 4) {
      validatePin(value)
    } else if (key == 'pinRetry' && localToString(value).length == 4) {
      validatePinRetry(value)
    }
    return setState(prevState => update(prevState, { [key]: { $set: format ? format(value) : value } }));
  };

  //rendering
  const LeftButton = () => {
    return (
      <Ionicons
        name='log-out'
        style={Styles.leftButton}
      />
    )
  }

  const RightButton = () => {
    return (
      <Ionicons
        name='backspace-sharp'
        style={Styles.rightButton}
        size={moderateScale(35)}
      />
    )
  }

  return (
    <Container>
      <Content
        contentContainerStyle={Styles.content}
        refreshControl={
          <RefreshControl
            {...RefreshControlBaseProps}
            refreshing={props.isLoading}
            enabled={false}
          />
        }
      >
        <CheckRender allowed={!newPinSetting && canGoBack}>
          <ButtonBack
            onPress={() => props.navigation.goBack()}
          />
        </CheckRender>
        <Animated.Text style={[Styles.title, { color: error ? COLORS.error : COLORS.black, transform: [{ translateX: shakeAnim }] }]}>
          {!error ?
            newPinSetting ?
              step == 1 ? 'Configura tu pin' : 'Reintroduce tu pin' :
              'Introduce tu \n código secreto'
            :
            'Pin no coincide'
          }
        </Animated.Text>
        <Separator height={30} />
        <Text style={Styles.body}>
          Para Acceder introduce tu código
        </Text>
        <Text style={Styles.body}>
          Secreto de cuatro dígitos
        </Text>
        <Separator height={40} />
        <View style={Styles.pinSection}>
          <PinView
            // @ts-ignore
            ref={pinView}
            pinLength={4}
            onValueChange={onStateChange(step == 1 ? 'pin' : 'pinRetry')}
            buttonAreaStyle={Styles.buttonAreaStyle}
            inputViewEmptyStyle={error ? Styles.inputViewEmptyError : Styles.inputViewEmptyStyle}
            inputViewFilledStyle={Styles.inputViewFilledStyle}
            buttonTextStyle={Styles.buttonTextStyle}
            onButtonPress={onButtonPress}
            customLeftButton={LeftButton}
            customRightButton={RightButton}
            buttonSize={moderateScale(70)}
            inputSize={moderateScale(15)}
            disabled={error || props.isLoading}
          />
        </View>
      </Content>
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<MainNavigatorParamList, 'Pin'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,
  isLoading: state.signin.isLoading,
  error: state.signin.error,
});

const mapDispatchToProps = {
  setPin: SigninActions.setPin,
  login: SigninActions.login,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(Pin)