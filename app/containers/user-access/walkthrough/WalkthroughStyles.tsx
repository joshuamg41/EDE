import { StyleSheet } from 'react-native';
import { COLORS, FONTS, METRICS } from '../../../themes';
import { horizontalScale } from '../../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  container: {

  },
  topSection: {
    height: '40%',
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  bottomSection: {
    height: '60%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(METRICS.large15),
  },
  title: {
    fontSize: FONTS.largeIcon,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default Styles