import {StyleSheet} from 'react-native';
import {FONTS, FONTS_FAMILY, METRICS} from '../../../themes';
import COLORS from '../../../themes/Colors';
import {moderateScale, verticalScale} from '../../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderTopWidth: moderateScale(1),
    borderTopColor: COLORS.lightGray,
    height: verticalScale(60),
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: verticalScale(5),
    paddingBottom: verticalScale(5),
  },

  buttonInnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  icon: {
    width: moderateScale(30),
    height: moderateScale(30),
    tintColor: COLORS.gray,
  },

  iconFocused: {
    width: moderateScale(50),
    height: moderateScale(50),
    tintColor: COLORS.secondary,
  },

  ionicons: {
    fontSize: moderateScale(25),
    color: COLORS.gray,
  },

  ioniconsFocused: {
    fontSize: moderateScale(25),
    color: COLORS.secondary,
  },

  text: {
    fontSize: FONTS.small,
    color: COLORS.gray,
  },

  textFocused: {
    fontSize: FONTS.small,
    color: COLORS.secondary,
  },

  menuTitle: {
    fontFamily: FONTS_FAMILY.regular.body,
    fontSize: FONTS.small,
    color: COLORS.gray,
  },

  menuTitleFocused: {
    fontFamily: FONTS_FAMILY.bold.body,
    fontSize: FONTS.small,
    color: COLORS.primary,
  },

  svgContainerStyle: {
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(30),
    marginBottom: verticalScale(5),
  },
});

export default Styles;
