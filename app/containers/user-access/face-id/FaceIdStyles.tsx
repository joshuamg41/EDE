import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../themes';
import { horizontalScale, moderateScale } from '../../../utils/StyleHelpers';
import METRICS from '../../../themes/Metrics';

const Styles = StyleSheet.create({
  container: {

  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(METRICS.medium10),
  },
  fingerprint: {
    height: moderateScale(100),
    width: moderateScale(100),
    tintColor: COLORS.primary,
  },
  title: {
    fontSize: moderateScale(40),
    textAlign: 'center',
    color: COLORS.primary,
  },
  body: {
    fontSize: FONTS.title,
    color: COLORS.gray,
    textAlign: 'center',
  },
});

export default Styles