import {StyleSheet} from 'react-native';
import {COLORS, METRICS} from '../../../../themes';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  itemContent: {
    marginHorizontal: horizontalScale(METRICS.xLargeMedium25),
    borderRadius: moderateScale(METRICS.large15),
    backgroundColor: COLORS.quaternary,
    borderColor: COLORS.tertiaryOpacity,
  },
});

export default Styles;
