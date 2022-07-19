import {StyleSheet} from 'react-native';
import {COLORS, FONTS, METRICS} from '../../../themes';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/StyleHelpers';

export default StyleSheet.create({
  container: {
    paddingLeft: horizontalScale(METRICS.medium10),
  },
  logoContent: {
    // paddingVertical: verticalScale(METRICS.medium10),
    paddingHorizontal: horizontalScale(METRICS.large15),
    borderBottomWidth: moderateScale(2),
    borderColor: COLORS.lightGray,
  },
  logo: {
    alignSelf: 'center',
    width: '70%',
    height: verticalScale(100),
  },
  arrowBack: {
    width: FONTS.mediumIcon,
    height: FONTS.mediumIcon,
    tintColor: COLORS.black,
  },
  tournamentImage: {
    width: moderateScale(100),
    height: moderateScale(100),
  },
  title: {
    fontSize: FONTS.xLarge,
  },
  textStyle: {
    color: COLORS.primary,
  },
  drawerLabel: {
    fontSize: FONTS.medium,
    color: COLORS.gray,
  },
  logoutView: {
    flex: 0,
    justifyContent: 'flex-end',
  },
  logoutOption: {
    paddingTop: METRICS.medium10,
    paddingBottom: METRICS.medium10,
  },
});
