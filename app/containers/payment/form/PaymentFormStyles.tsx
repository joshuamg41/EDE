import { StyleSheet } from 'react-native';
import { COLORS, METRICS } from '../../../themes';
import { horizontalScale, moderateScale, verticalScale } from '../../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  subTitle: {
    color: COLORS.tertiary,
  },
  siriteTouchable: {
    width: '100%',
    borderColor: COLORS.tertiary,
    borderWidth: moderateScale(1),
    paddingHorizontal: horizontalScale(METRICS.large15),
    paddingVertical: verticalScale(METRICS.large15),
    borderRadius: moderateScale(METRICS.small5),

  },
  siriteImage: {
    width: '100%',
    height: moderateScale(75),
  },
  siriteText: {
    textAlign: 'center',
    color: COLORS.tertiary,
  },
});

export default Styles