import { StyleSheet } from 'react-native';
import { COLORS, FONTS, FONTS_FAMILY } from '../../../themes';
import METRICS from '../../../themes/Metrics';
import { horizontalScale, moderateScale, verticalScale } from '../../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  container: {

  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(METRICS.medium10),
  },
  title: {
    fontSize: moderateScale(30),
    textAlign: 'center',
    fontFamily: FONTS_FAMILY.medium.title,
  },
  body: {
    fontSize: FONTS.medium,
    color: COLORS.gray,
    textAlign: 'center',
  },
  leftButton: {
    color: COLORS.error,
    fontSize: moderateScale(40),
  },
  rightButton: {
    color: COLORS.gray,
  },

  //pin
  pinSection: {
    paddingHorizontal: horizontalScale(METRICS.xLargeMedium25),
  },
  buttonAreaStyle: {
    marginTop: verticalScale(METRICS.large15),
  },
  inputViewEmptyStyle: {
    backgroundColor: COLORS.lightGray,
    marginHorizontal: horizontalScale(METRICS.large15),
  },
  inputViewFilledStyle: {
    backgroundColor: COLORS.tertiary,
    marginHorizontal: horizontalScale(METRICS.large15),
  },
  buttonTextStyle: {
    color: COLORS.black,
    fontFamily: FONTS_FAMILY.medium.title,
    fontSize: moderateScale(30),
  },

  //Error Styles
  inputViewEmptyError: {
    backgroundColor: COLORS.error,
    marginHorizontal: horizontalScale(METRICS.large15),
  },
});

export default Styles