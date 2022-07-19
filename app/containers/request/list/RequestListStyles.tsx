import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {COLORS, FONTS, FONTS_FAMILY, METRICS} from '../../../themes';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  container: {
    //exampleColor: color
  },
  content: {},
  headerSection: {
    paddingHorizontal: horizontalScale(METRICS.large15),
  },
  summaryContent: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  verticalSeparator: {
    width: horizontalScale(1),
    marginHorizontal: horizontalScale(METRICS.small5),
    height: verticalScale(METRICS.xLargeMedium25),
    backgroundColor: COLORS.gray,
  },
  title: {
    fontFamily: FONTS_FAMILY.medium.title,
    fontSize: FONTS.title,
    color: COLORS.primary,
  },

  //Filter
  //@ts-ignore
  filterText: (active: boolean): ViewStyle | TextStyle | ImageStyle => ({
    fontSize: active ? FONTS.title : FONTS.regular,
    color: active ? COLORS.gray : COLORS.grayPlaceholder,
  }),

  //Notification
  notificationContent: {
    position: 'absolute',
    bottom: moderateScale(13),
    right: moderateScale(10),
    backgroundColor: COLORS.primary,
    borderRadius: moderateScale(METRICS.xxLarge30),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(9),
    minWidth: moderateScale(METRICS.large15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: FONTS.small,
    color: COLORS.white,
  },
});

export default Styles;
