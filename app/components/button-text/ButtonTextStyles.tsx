import { StyleSheet } from 'react-native';
import { COLORS, FONTS, METRICS } from '../../themes';

const Styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonContent: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: METRICS.medium10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 60,
    borderRadius: 5,
    shadowOffset: {
      width: 10,
      height: 10,
    },
  },
  title: {
    fontSize: FONTS.medium,
  },
  loading: {
    padding: METRICS.small5,
  },
});

export default Styles