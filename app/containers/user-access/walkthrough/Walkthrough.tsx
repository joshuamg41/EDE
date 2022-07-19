import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useRef, useState } from 'react';
import { Image, View } from 'react-native';
import RNSplashScreen from 'react-native-splash-screen';
import { connect, ConnectedProps } from "react-redux";
import Button from '../../../components/button/Button';
import Container from '../../../components/container/Container';
import Content from '../../../components/content/Content';
import CheckRender from '../../../components/security/CheckRender';
import Text from '../../../components/text/Text';
import { navigateAndReset } from '../../../services/NavigationService';
import { RootState } from '../../../stores/AppReducers';
import deviceStorage from '../../../stores/DeviceStorage';
import SigninActions from '../../../stores/signin/Actions';
import { MainNavigatorParamList } from '../../root/navigators/MainNavigator';
import { WalkthroughState } from './WalkthroughConstants';
import Styles from './WalkthroughStyles';

const Walkthrough = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [state, setState] = useState<WalkthroughState>({})

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      RNSplashScreen.hide()
      return () => {
        deviceStorage.saveItem('walkthrought', 'true')
      }
    }, [props.navigation])
  );

  //rendering
  return (
    <Container>
      <Content>
        <View style={Styles.topSection}>
          <CheckRender allowed={props.getData?.image}>
            <Image
              source={{ uri: props.getData?.image }}
              style={Styles.image}
              resizeMode='cover'
            />
          </CheckRender>
        </View>
        <View style={Styles.bottomSection}>
          <Text style={Styles.title}>{props.getData?.title}</Text>
          <Text>{props.getData?.content}</Text>
          <Button
            title='Comenzar'
            onPress={() => navigateAndReset('Welcome')}
            widthSeparator={0}
          />
        </View>
      </Content>
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<MainNavigatorParamList, 'Walkthrough'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  getData: state.walkthrough.getData,
  getLoading: state.walkthrough.getLoading,
  getError: state.walkthrough.getError,
});

const mapDispatchToProps = {
  destroyData: SigninActions.logoutDestroyData,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(Walkthrough)