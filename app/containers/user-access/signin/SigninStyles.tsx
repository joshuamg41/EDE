import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../themes';
import { moderateScale } from '../../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  container: {

  },
  content: {
    
  },
  formSection: {
    flex: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: moderateScale(35),
    textAlign: 'center',
    color: COLORS.black,
  },
  forgottenButton: {
    alignSelf: 'flex-end',
  },
  signupButton: {

  },
});

export default Styles