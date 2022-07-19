import { StyleSheet } from 'react-native';
import { FONTS, FONTS_FAMILY } from '../../../themes';
import ApplicationStyles from '../../../themes/ApplicationStyles';

const Styles = StyleSheet.create({
  container: {
    //exampleColor: color
  },
  title: {
    ...ApplicationStyles.hMLarge,
    fontSize: FONTS.title,
  },
});

export default Styles