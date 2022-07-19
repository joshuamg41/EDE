import React, { FunctionComponent } from "react";
import { Modal as RNModal, ModalProps, StyleProp, TouchableHighlight, View, ViewStyle } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS } from "../../themes";
import Content from "../content/Content";
import Styles from './ModalStyles';

const Modal: FunctionComponent<ModalPropTypes> = props => {
  const onPress = () => {
    if (typeof props.onVisibleChange == 'function') {
      props.onVisibleChange(false)
    }
  }

  return (
    <RNModal
      {...props}
      visible={!!props.isVisible}
      transparent={true}
      animationType={"fade"}
    >
      <Content
        style={Styles.container}
        contentContainerStyle={[Styles.outerContent, props.outerContent]}
      >
        <View style={[Styles.innerContent, props.innerContent]}>
          <TouchableHighlight
            underlayColor={COLORS.tertiary}
            onPress={onPress}
            style={Styles.closeTouchable}
          >
            <Ionicons
              name='close'
              color={COLORS.white}
              size={FONTS.smallIcon}
            />
          </TouchableHighlight>
          {props.children}
        </View>
      </Content>
    </RNModal>
  );
};

export interface ModalPropTypes extends ModalProps {
  isVisible?: boolean | string;
  onVisibleChange?: (val: boolean) => void;
  children?: Element[] | JSX.Element | JSX.Element[] | undefined;
  outerContent?: StyleProp<ViewStyle>;
  innerContent?: StyleProp<ViewStyle>;
}

Modal.defaultProps = {
  isVisible: false,
}

export default Modal;