import React, { FunctionComponent } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import { COLORS, FONTS, METRICS } from '../../themes';
import Colors from '../../themes/Colors';
import { horizontalScale, verticalScale } from '../../utils/StyleHelpers';
import Loading from '../loading/Loading';
import CheckRender from '../security/CheckRender';
import Separator from '../separator/Separator';
import Text from '../text/Text';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ButtonBack: FunctionComponent<propTypes> = (props) => {
  const localPress = () => {
    if (props.isLoading || props.disabled) {
      return () => { }
    } else if (typeof props.onPress === 'function') {
      return props.onPress()
    }
  }

  return (
    <TouchableOpacity
      style={Styles.iconContainer}
      onPress={localPress}
    >
      <Ionicons
        name={"chevron-back"}
        size={FONTS.mediumIcon}
        color={props.color || COLORS.gray}
      />
    </TouchableOpacity>
  );
};

interface propTypes {
  isLoading?: boolean;
  onPress?: any;
  disabled?: boolean;
  color?: string;
}

ButtonBack.defaultProps = {
  onPress: () => { },
}

const Styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    top: verticalScale(METRICS.xxLarge30),
    left: horizontalScale(METRICS.large15),
  },
});

export default React.memo(ButtonBack)