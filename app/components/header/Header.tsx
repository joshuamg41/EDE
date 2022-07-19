import React, {FunctionComponent} from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Images from '../../assets/images';
import {goBack} from '../../services/NavigationService';
import {COLORS, FONTS, FONTS_FAMILY, METRICS} from '../../themes';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/StyleHelpers';
import CheckRender from '../security/CheckRender';

const Header: FunctionComponent<propTypes> = props => {
  const onPressIcon = () => {
    if (typeof props.onPressLeftIcon == 'function') {
      props.onPressLeftIcon();
    } else if (props.leftIcon) {
      goBack();
    }
  };

  const onPressRightIcon = () => {
    if (typeof props.onPressRightIcon == 'function') {
      props.onPressRightIcon();
    } else {
      return;
    }
  };

  const hitSlopLeft = {top: 20, right: 0, bottom: 20, left: 10};
  const hitSlopRight = {top: 20, right: 10, bottom: 20, left: 10};

  return (
    <View style={[Styles.header]}>
      <View style={Styles.headerLeftView}>
        <TouchableOpacity onPress={onPressIcon} hitSlop={hitSlopLeft}>
          <CheckRender allowed={props.leftIcon}>
            <CheckRender allowed={props.iconName == 'menu'}>
              {/* <Image
                source={Images.icon_menu}
                style={[Styles.menuIcon, { tintColor: props.leftIconColor || COLORS.gray }]}
                resizeMode='contain'
              /> */}
              <Ionicons
                name={props.iconName || 'menu'}
                size={FONTS.mediumIcon}
                color={props.leftIconColor || COLORS.white}
              />
            </CheckRender>
            <CheckRender allowed={props.iconName != 'menu'}>
              <Ionicons
                name={props.iconName || 'chevron-back'}
                size={FONTS.mediumIcon}
                color={props.leftIconColor || COLORS.white}
              />
            </CheckRender>
          </CheckRender>
        </TouchableOpacity>
      </View>
      <CheckRender allowed={props.showLogo}>
        <Image
          source={Images.logo_mitur_letter_less}
          style={[Styles.logo]}
          resizeMode="contain"
        />
      </CheckRender>
      <View style={Styles.body}>
        <Text style={[Styles.headerTitleText, props.headerTitleStyle]}>
          {props.title}
        </Text>
      </View>
      <View style={Styles.headerRightView}>
        <TouchableOpacity
          hitSlop={hitSlopRight}
          onPress={onPressRightIcon}
          disabled={props.disableRightIcon}>
          <CheckRender allowed={props.rightIcon}>{props.rightIcon}</CheckRender>
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface propTypes {
  title?: string;
  iconType?: string;
  iconName?: string;
  rightIcon?: any;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
  leftIcon?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  leftIconColor?: string;
  disableRightIcon?: boolean;
  headerTitleStyle?: StyleProp<TextStyle>;
  showLogo?: boolean;
}

Header.defaultProps = {
  iconName: undefined,
  iconType: undefined,
  rightIcon: false,
  onPressLeftIcon: undefined,
  onPressRightIcon: undefined,
  containerStyle: {
    backgroundColor: COLORS.transparent,
  },
  headerTitleStyle: {},
  showLogo: false,
};

const Styles = StyleSheet.create({
  header: {
    paddingHorizontal: horizontalScale(METRICS.medium10),
    minHeight: verticalScale(70),
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    marginBottom: verticalScale(10),
  },
  headerLeftView: {
    flex: 0,
    justifyContent: 'center',
    minWidth: horizontalScale(50),
  },
  menuIcon: {
    width: moderateScale(METRICS.xxLarge30),
    height: moderateScale(METRICS.xxLarge30),
    tintColor: COLORS.white,
  },
  logo: {
    height: moderateScale(40),
    width: moderateScale(40),
    alignSelf: 'center',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleText: {
    fontSize: FONTS.large,
    color: COLORS.secondary,
    fontFamily: FONTS_FAMILY.bold.title,
    textAlign: 'center',
  },
  headerRightView: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: horizontalScale(50),
  },
  rightIcon: {
    width: moderateScale(60),
    height: moderateScale(60),
  },
});

export default React.memo(Header);
