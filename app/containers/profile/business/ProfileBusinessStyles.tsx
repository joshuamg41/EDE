import { StyleSheet } from 'react-native';
import { COLORS, METRICS } from '../../../themes';
import { moderateScale, verticalScale } from '../../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  container: {
    //exampleColor: color
  },
  content: {
    paddingVertical: verticalScale(METRICS.large15),
  },
  imageIcon: {
    fontSize: moderateScale(METRICS.xxLarge30),
    color: COLORS.white,
  },
});

export default Styles