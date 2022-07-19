import { StyleSheet } from 'react-native';
import { COLORS, FONTS, METRICS } from '../../../themes';
import { horizontalScale, moderateScale, verticalScale } from '../../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  container: {
    //exampleColor: color
  },
  headerSection: {
    paddingHorizontal: horizontalScale(METRICS.large15),
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(METRICS.medium10),
  },
  title:{
    fontSize: FONTS.xLarge,
  },
  photo: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(40),
    borderColor: COLORS.lightGray,
    borderWidth: moderateScale(1),
    alignSelf: 'center',
  },
});

export default Styles