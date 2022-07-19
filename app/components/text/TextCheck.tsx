import React, { FunctionComponent } from 'react';
import { ImageSourcePropType, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, METRICS } from '../../themes';
import ApplicationStyles from '../../themes/ApplicationStyles';
import { horizontalScale, moderateScale } from '../../utils/StyleHelpers';
import CheckRender from '../security/CheckRender';
import Separator from '../separator/Separator';
import Text, { TextPropTypes } from './Text';

const TextCheck: FunctionComponent<propTypes> = props => {
  //misc
  const pressed = () => {
    props.onValueChange(!props.value)
  }

  //rendering
  return (
    <>
      <View style={[Styles.container, props.containerStyle]}>
        <View style={ApplicationStyles.flex1}>
          <Text {...props} onPress={undefined}>{props.children}</Text>
        </View>
        <TouchableOpacity
          onPress={pressed}
          disabled={props.disabled}
        >
          <View style={Styles.square}>
            <CheckRender allowed={props.value}>
              <Ionicons
                name={'checkmark'}
                color={COLORS.primary}
                size={FONTS.smallIcon}
              />
            </CheckRender>
          </View>
        </TouchableOpacity>
      </View>
      <CheckRender allowed={props.bottomSeparate}>
        <Separator />
      </CheckRender>
    </>
  )
};

interface propTypes extends TextPropTypes {
  image?: ImageSourcePropType;
  icon?: string;
  color?: string;
  value?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onValueChange: (val: boolean) => void;
  disabled?: boolean;
  bottomSeparate?: boolean;
}

TextCheck.defaultProps = {
  color: COLORS.secondary,
  bottomSeparate: true,
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(METRICS.large15),
  },
  text: {
    color: COLORS.black,
    fontSize: FONTS.regular,
  },
  square: {
    height: moderateScale(30),
    width: moderateScale(30),
    borderRadius: 5,
    borderColor: COLORS.primary,
    borderWidth: moderateScale(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
})


export default TextCheck