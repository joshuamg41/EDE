import { StyleSheet } from 'react-native';
import { COLORS, METRICS } from '../../../../themes';
import { horizontalScale, verticalScale } from '../../../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  itemContent: {
    paddingVertical: verticalScale(METRICS.large15),
    paddingHorizontal: horizontalScale(METRICS.large15),
    backgroundColor: COLORS.white,
    borderColor: COLORS.tertiaryOpacity,
  },
  title: {
    color: COLORS.tertiary,
  },
  body: {
    color: COLORS.gray,
  },
});

export default Styles