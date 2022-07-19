import { StyleSheet } from 'react-native';
import { COLORS, FONTS, METRICS } from '../../../themes';
import { horizontalScale } from '../../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  content: {

  },
  horizontalSeparator: {
    paddingHorizontal: horizontalScale(METRICS.large15),
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONTS.word,
    paddingHorizontal: horizontalScale(METRICS.large15),
  },
});

export default Styles