import {StyleSheet} from 'react-native';
import {COLORS} from '../../themes';
import {moderateScale} from '../../utils/StyleHelpers';

const Themes = StyleSheet.create({
  primary: {
    backgroundColor: COLORS.primary,
    loader: COLORS.white,
    icon: COLORS.white,
    shadowColor: COLORS.primary,
    textColor: COLORS.white,
  },
  primaryOutline: {
    backgroundColor: COLORS.white,
    loader: COLORS.primary,
    icon: COLORS.primary,
    shadowColor: COLORS.primary,
    textColor: COLORS.primary,
    borderColor: COLORS.primary,
    borderWidth: moderateScale(1),
  },
  secondary: {
    backgroundColor: COLORS.secondary,
    loader: COLORS.white,
    icon: COLORS.white,
    shadowColor: COLORS.secondary,
    textColor: COLORS.primary,
  },
  tertiary: {
    backgroundColor: COLORS.tertiary,
    loader: COLORS.white,
    icon: COLORS.white,
    shadowColor: COLORS.tertiary,
    textColor: COLORS.white,
  },
  tertiaryOutline: {
    backgroundColor: COLORS.white,
    loader: COLORS.tertiary,
    icon: COLORS.tertiary,
    shadowColor: COLORS.tertiary,
    textColor: COLORS.tertiary,
    borderColor: COLORS.tertiary,
    borderWidth: moderateScale(1),
  },
  plain: {
    backgroundColor: COLORS.transparent,
    loader: COLORS.white,
    icon: COLORS.white,
    shadowColor: COLORS.transparent,
    textColor: COLORS.white,
  },
  grayPlain: {
    backgroundColor: COLORS.transparent,
    loader: COLORS.gray,
    icon: COLORS.gray,
    shadowColor: COLORS.transparent,
    textColor: COLORS.gray,
    shadowOpacity: undefined,
    elevation: 0,
  },
  errorOutline: {
    backgroundColor: COLORS.white,
    loader: COLORS.error,
    icon: COLORS.error,
    shadowColor: COLORS.error,
    textColor: COLORS.error,
    borderColor: COLORS.error,
    borderWidth: moderateScale(1),
  },
});

export default Themes;
