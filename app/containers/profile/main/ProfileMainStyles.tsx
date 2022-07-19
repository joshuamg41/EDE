import { StyleSheet } from 'react-native';
import { COLORS, FONTS, FONTS_FAMILY, METRICS } from '../../../themes';
import { horizontalScale, moderateScale, verticalScale } from '../../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  container: {
    //exampleColor: color
  },
  content: {

  },
  headerSection: {

  },
  headerTitle: {
    color: COLORS.white,
  },
  usernameTitle: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: FONTS.xLarge,
  },
  bodySection: {

  },
  bodyTitle: {
    fontSize: FONTS.title,
    fontFamily: FONTS_FAMILY.medium.title,
    paddingHorizontal: horizontalScale(METRICS.large15),
  },

  //myData
  myDataSection: {
    paddingVertical: verticalScale(METRICS.large15),
    paddingHorizontal: horizontalScale(METRICS.large15),
    marginHorizontal: horizontalScale(METRICS.large15),
    borderRadius: moderateScale(METRICS.small5),
    backgroundColor: COLORS.white,
    borderColor: COLORS.tertiaryOpacity,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

  //Modalize
  modalizeContent: {
    paddingTop: verticalScale(METRICS.xLarge20),
  },
  handleStyle: {
    backgroundColor: COLORS.primary,
    borderWidth: moderateScale(0.5),
    borderColor: COLORS.white,
  },
});

export default Styles