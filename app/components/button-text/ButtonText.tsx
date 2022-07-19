import React, { FunctionComponent } from 'react';
import { StyleProp, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import { METRICS } from '../../themes';
import { horizontalScale, verticalScale } from '../../utils/StyleHelpers';
import CheckRender from '../security/CheckRender';
import Separator from '../separator/Separator';
import Text from '../text/Text';
import Styles from './ButtonTextStyles';
import Themes from './ButtonTextThemes';

const ButtonText: FunctionComponent<propTypes> = (props) => {
  const localPress = () => {
    if (props.isLoading || props.disabled) {
      return () => { }
    } else if (typeof props.onPress === 'function') {
      return props.onPress()
    } else {
      return () => { }
    }
  }

  const hitSlop = {
    top: verticalScale(10),
    right: horizontalScale(10),
    bottom: verticalScale(10),
    left: horizontalScale(10)
  }

  return (
    <>
      <TouchableOpacity
        {...props.touchableProps}
        onPress={localPress}
        activeOpacity={props.activeOpacity}
        style={[Styles.buttonContainer, props.containerStyle, { marginHorizontal: props.widthSeparator }]}
        disabled={props.disabled || props.isLoading}
        hitSlop={hitSlop}
      >
        <Text style={[Styles.title, Themes[props.theme || 'primary'], props.textStyle]}>{props.title}</Text>
      </TouchableOpacity>
      <CheckRender allowed={props.bottomSeparate}>
        <Separator />
      </CheckRender>
    </>
  );
};

interface propTypes {
  isLoading?: boolean;
  onPress?: any;
  title: string;
  widthSeparator?: number;
  activeOpacity?: number;
  touchableProps?: TouchableOpacityProps;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  bottomSeparate?: boolean;
  theme?: 'primary' | "grayPlain" | "secondary" | "tertiary";
  children?: JSX.Element | JSX.Element[] | undefined;
}

ButtonText.defaultProps = {
  isLoading: false,
  onPress: () => { },
  title: 'Crear o Consultar',
  widthSeparator: horizontalScale(METRICS.large15),
  activeOpacity: 0.2,
  children: undefined,
  bottomSeparate: true,
  theme: 'secondary'
}

export default React.memo(ButtonText)