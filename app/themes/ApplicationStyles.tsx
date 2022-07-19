import { StyleSheet } from 'react-native';
import { METRICS } from '.';
import { horizontalScale, moderateScale, verticalScale } from '../utils/StyleHelpers';
import COLORS from './Colors';

const ApplicationStyles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  flexGrow1: {
    flexGrow: 1,
  },
  flex0: {
    flex: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldRow: {
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(METRICS.large15),
  },
  whiteBackground: {
    backgroundColor: COLORS.white,
  },
  hPSmall: {
    paddingHorizontal: horizontalScale(METRICS.small5),
  },
  hPMedium: {
    paddingHorizontal: horizontalScale(METRICS.medium10),
  },
  hPLarge: {
    paddingHorizontal: horizontalScale(METRICS.large15),
  },
  pLarge: {
    paddingHorizontal: horizontalScale(METRICS.large15),
    paddingVertical: verticalScale(METRICS.medium10),
  },
  hMLarge: {
    marginHorizontal: horizontalScale(METRICS.large15),
  },
  photo: {
    height: moderateScale(125),
    width: moderateScale(125),
    borderRadius: moderateScale(125),
    borderColor: COLORS.lightGray,
    borderWidth: moderateScale(1),
  },
});

export default ApplicationStyles