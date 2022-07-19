import { StyleSheet } from 'react-native';
import { METRICS } from '../../../themes';
import { horizontalScale } from '../../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  content: {

  },
  horizontalSeparator: {
    paddingHorizontal: horizontalScale(METRICS.large15),
  },
});

export default Styles