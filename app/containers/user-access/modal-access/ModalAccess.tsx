import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import update from 'immutability-helper';
import React, { useRef, useState } from 'react';
import { Modal, TouchableWithoutFeedback, View } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from '../../../stores/AppReducers';
import ApplicationStyles from '../../../themes/ApplicationStyles';
import { localToString } from '../../../utils/StringUtil';
import Signin from '../signin/Signin';
import Signup from '../signup/Signup';
import TabBar from './components/TabBar';
import { ModalAccessState } from './ModalAccessConstants';
import Styles from './ModalAccessStyles';

const MaterialTop = createMaterialTopTabNavigator();
const ModalAccess = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [state, setState] = useState<ModalAccessState>({})

  //misc
  const onPressClose = () => {
    if (typeof props.setModalVisible == 'function') {
      props.setModalVisible(false)
    }
  }

  //Value change handlers
  const onStateChange = (key: string, format?: (value: any) => string) => (value: any) => {
    return setState(prevState => update(prevState, { [key]: { $set: format ? format(value) : value } }));
  };

  //rendering
  return (
    <Modal
      visible={!!props.modalVisible}
      transparent={true}
      animationType='slide'
      onRequestClose={onPressClose}
    >
      <TouchableWithoutFeedback onPress={onPressClose}>
        <View style={Styles.separator} />
      </TouchableWithoutFeedback>
      <View
        style={ApplicationStyles.flex1}
      >
        <MaterialTop.Navigator
          initialRouteName={props.modalVisible ? localToString(props.modalVisible) : "Signin"}
          tabBar={(props) => <TabBar {...props} />}
        >
          <MaterialTop.Screen options={{ title: 'Iniciar Sesión' }} name="Signin" component={Signin} />
          <MaterialTop.Screen options={{ title: 'Registrarme' }} name="Signup" component={Signup} />
        </MaterialTop.Navigator>
      </View>
    </Modal>
  )
}

interface ScreenProps extends ReduxProps {
  modalVisible?: boolean | string,
  setModalVisible?: (val: boolean) => void,
  children?: Element[] | JSX.Element | JSX.Element[] | undefined;
}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,
});

const mapDispatchToProps = {

}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(ModalAccess)