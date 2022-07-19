import { StyleSheet } from 'react-native';
import { COLORS, FONTS, FONTS_FAMILY, METRICS } from '../../../themes';
import { horizontalScale, viewportHeight } from '../../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  content: {
    paddingHorizontal: horizontalScale(METRICS.large15),
  },
  serviceType: {
    textAlign: 'center',
    color: COLORS.gray,
  },
  serviceTitle: {
    fontSize: FONTS.xLarge,
    fontFamily: FONTS_FAMILY.medium.title,
    textAlign: 'center',
  },
  priceTitle: {
    textAlign: 'center',
    color: COLORS.gray,
  },
  priceBody: {
    fontSize: FONTS.mediumIcon,
    color: COLORS.tertiary,
    fontFamily: FONTS_FAMILY.medium.title,
    textAlign: 'center',
  },
  generalInformationTitle: {
    textAlign: 'center',
    fontFamily: FONTS_FAMILY.medium.title,
    fontSize: FONTS.title,
  },
  generalInformationBody: {
    
  },
  subTitle: {
    fontSize: FONTS.regular,
    fontFamily: FONTS_FAMILY.medium.title, 
  },
  readMoreContainer: {
    justifyContent: 'center',
  },
});

export default Styles