import React, { FunctionComponent } from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, TextInput, TextStyle, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Images from '../../assets/images';
import { FONTS, METRICS } from '../../themes';
import COLORS from '../../themes/Colors';
import { isEmpty } from '../../utils/ValidationUtil';
import CheckRender from '../security/CheckRender';
import Separator from '../separator/Separator';

const Icon: FunctionComponent<IconPropTypes> = props => {
  const textColorStyle: StyleProp<TextStyle> = {
    color: !isEmpty(props.value) ? COLORS.gray : COLORS.grayPlaceholder,
  }
  const imageColorStyle: StyleProp<ImageStyle> = {
    tintColor: props.value ? COLORS.gray : COLORS.grayPlaceholder,
  }

  return (
    <>
      <CheckRender allowed={props.image || props.iconName}>
        <View style={Styles.secondaryView}>
          <CheckRender allowed={!props.image && props.iconName}>
            <Ionicons
              name={props.iconName || "add"}
              style={[Styles.icon, textColorStyle]}
              onPress={() => props.inputRef?.focus()}
            />
          </CheckRender>
          <CheckRender allowed={props.image && !props.iconName}>
            <Image
              source={props.image ?? Images.fingerprint}
              resizeMode='contain'
              style={[Styles.imageIcon, imageColorStyle]}
            />
          </CheckRender>
        </View>
        <Separator width={METRICS.medium10} />
      </CheckRender>
    </>
  );
}

export interface IconPropTypes {
  iconName?: string;
  image?: ImageSourcePropType;
  value?: any;
  inputRef?: TextInput;
}

Icon.defaultProps = {

}

const Styles = StyleSheet.create({
  secondaryView: {
    flex: 0,
  },
  icon: {
    fontSize: FONTS.smallIcon,
    color: COLORS.gray,
  },
  imageIcon: {
    height: FONTS.smallIcon,
    width: FONTS.smallIcon,
  },
});

export default Icon