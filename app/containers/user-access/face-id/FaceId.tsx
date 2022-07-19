import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import update from 'immutability-helper';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image, View } from 'react-native';
import RNSplashScreen from 'react-native-splash-screen';
import TouchID from 'react-native-touch-id';
import { connect, ConnectedProps } from "react-redux";
import Images from '../../../assets/images';
import Button from '../../../components/button/Button';
import Container from '../../../components/container/Container';
import Content from '../../../components/content/Content';
import Separator from '../../../components/separator/Separator';
import Text from '../../../components/text/Text';
import { navigateAndReset } from '../../../services/NavigationService';
import { RootState } from '../../../stores/AppReducers';
import SigninActions from '../../../stores/signin/Actions';
import { COLORS } from '../../../themes';
import { MainNavigatorParamList } from '../../root/navigators/MainNavigator';
import { FaceIdState } from './FaceIdConstants';
import Styles from './FaceIdStyles';

const FaceId = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [state, setState] = useState<FaceIdState>({})
  const [error, setError] = useState<Boolean>(false)
  const [localLoading, setLocalLoading] = useState<boolean>(false)

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      RNSplashScreen.hide()
      authenticateTouchId()
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

  //Misc
  const authenticateTouchId = () => {
    const optionalConfigObject = {
      title: 'Lector de Huellas',
      imageColor: COLORS.primary,
      imageErrorColor: COLORS.error,
      sensorDescription: 'Coloque el dedo en el sensor',
      sensorErrorDescription: 'Intente de nuevo',
      cancelText: 'Cancelar',
      fallbackLabel: 'Show Passcode',
      unifiedErrors: false,
      passcodeFallback: false,
    };

    TouchID.authenticate(undefined, optionalConfigObject)
      .then((success: any) => {
        doRequest()
      })
      .catch((error: any) => {
        setError(true)
      });
  }

  //Value change handlers
  const onStateChange = (key: string, format?: (value: any) => string) => (value: any) => {
    return setState(prevState => update(prevState, { [key]: { $set: format ? format(value) : value } }));
  };

  //rendering
  return (
    <Container>
      <Content>
        <View style={Styles.content}>
          <Image
            source={Images.fingerprint}
            style={Styles.fingerprint}
          />
          <Separator height={40} />
          <Text theme='titleMedium' style={Styles.title}>Touch ID</Text>
          <Separator height={75} />
          <Text style={Styles.body}>Acceda con tu huella digital</Text>
          <Separator height={100} />
        </View>
        <Button
          title='Usar código de acceso'
          theme='tertiaryOutline'
          onPress={() => props.navigation.navigate('Pin')}
          isLoading={props.isLoading}
        />
      </Content>
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<MainNavigatorParamList, 'FaceId'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,
  isLoading: state.signin.isLoading,
  error: state.signin.error,
});

const mapDispatchToProps = {
  login: SigninActions.login,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(FaceId)