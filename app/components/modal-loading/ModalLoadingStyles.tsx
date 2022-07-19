import { StyleSheet } from 'react-native';
import { COLORS, METRICS } from '../../themes';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryOpacity,
  },
  outerContent: {
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(METRICS.large15),
    paddingVertical: horizontalScale(METRICS.large15),
  },
  innerContent: {
    borderRadius: moderateScale(METRICS.small5),
    paddingVertical: verticalScale(METRICS.large15),
    paddingHorizontal: horizontalScale(METRICS.large15),
  },
  closeTouchable: {
    position: 'absolute',
    top: moderateScale(-5),
    right: moderateScale(-5),
    backgroundColor: COLORS.error,
    height: moderateScale(30),
    width: moderateScale(30),
    borderRadius: moderateScale(15),
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Styles