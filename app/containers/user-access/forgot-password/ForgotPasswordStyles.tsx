import { StyleSheet } from 'react-native';
import { COLORS, FONTS, FONTS_FAMILY, METRICS } from '../../../themes';
import { horizontalScale, verticalScale } from '../../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  container: {
    //exampleColor: color
  },
  header: {
    top: 0,
    position: 'absolute',
  },
  content: {
    justifyContent: 'center',
  },
  titleSection: {
    paddingHorizontal: horizontalScale(METRICS.large15),
  },
  title: {
    color: COLORS.black,
    fontFamily: FONTS_FAMILY.bold.body,
    fontSize: FONTS.largeIcon,
  },
  subTitle: {
    color: COLORS.gray,
  },
});

export default Styles