import React, { FunctionComponent } from 'react';
import { Image, ImageSourcePropType, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Images from '../../assets/images';
import { COLORS, FONTS, METRICS } from '../../themes';
import { moderateScale, verticalScale } from '../../utils/StyleHelpers';
import CheckRender from '../security/CheckRender';
import Separator from '../separator/Separator';
import Text, { TextPropTypes } from './Text';

const TextIcon: FunctionComponent<propTypes> = props => {
  return (
    <View style={[Styles.container, props.containerStyle]}>
      <CheckRender allowed={props.image && !props.icon}>
        <Image
          source={props.image ?? Images.icon_arrow_down}
          resizeMode='contain'
          style={[Styles.imageIcon, { tintColor: props.color }]}
        />
      </CheckRender>
      <CheckRender allowed={props.icon && !props.image && props.iconType == 'Ionicons'}>
        <Ionicons
          name={props.icon ?? 'menu'}
          style={[Styles.icon, { color: props.color }]}
        />
      </CheckRender>
      <CheckRender allowed={props.icon && !props.image && props.iconType == 'MaterialCommunityIcons'}>
        <MaterialCommunityIcons
          name={props.icon ?? 'menu'}
          style={[Styles.icon, { color: props.color }]}
        />
      </CheckRender>
      <CheckRender allowed={props.icon || props.image}>
        <Separator width={METRICS.medium10} />
      </CheckRender>
      <Text {...props}>{props.children}</Text>
    </View>
  )
};

interface propTypes extends TextPropTypes {
  image?: ImageSourcePropType;
  icon?: string;
  color?: string;
  containerStyle?: StyleProp<ViewStyle>;
  iconType?: 'Ionicons' | 'MaterialCommunityIcons'
}

TextIcon.defaultProps = {
  color: COLORS.primary,
  iconType: 'Ionicons',
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(METRICS.small5),
  },
  text: {
    color: COLORS.black,
    fontSize: FONTS.regular,
  },
  imageIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  icon: {
    fontSize: moderateScale(20),
  }
})


export default TextIcon