import { StyleSheet } from 'react-native';
import { COLORS, FONTS, METRICS } from '../../themes';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorTitle: {
    textAlign: 'center',
    fontSize: FONTS.large,
  },
  errorBody: {
    textAlign: 'center',
  },

  //lottieModal
  outerContent: {
    backgroundColor: COLORS.grayPlaceholder,
    flex: 1,
    paddingHorizontal: horizontalScale(METRICS.large15),
    paddingVertical: horizontalScale(METRICS.large15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContent: {
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(METRICS.small5),
    paddingVertical: verticalScale(METRICS.large15),
    paddingHorizontal: horizontalScale(METRICS.large15),
    width: horizontalScale(150),
  },
  lottieImage: {
    height: moderateScale(100),
    width: moderateScale(100),
    alignSelf: 'center',
  },
});

export default Styles