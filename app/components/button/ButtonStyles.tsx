import { StyleSheet } from 'react-native';
import { FONTS, METRICS } from '../../themes';
import { horizontalScale, verticalScale } from '../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: verticalScale(55),
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  buttonContent: {
    paddingHorizontal: horizontalScale(METRICS.medium10),
  },
  title: {
    fontSize: FONTS.regular,
  },
  loading: {
    padding: METRICS.small5,
  },
});

export default Styles