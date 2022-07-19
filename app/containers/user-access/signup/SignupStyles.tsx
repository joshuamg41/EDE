import { StyleSheet } from 'react-native';
import { COLORS, FONTS, METRICS } from '../../../themes';
import { horizontalScale, moderateScale } from '../../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  container: {

  },
  content: {

  },
  formSection: {
    flex: 1,
  },
  photoError: {
    height: moderateScale(125),
    width: moderateScale(125),
    borderRadius: moderateScale(125),
    borderWidth: moderateScale(2),
    borderColor: COLORS.error,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  photoContain: {
    height: moderateScale(125),
    width: moderateScale(125),
    borderRadius: moderateScale(125),
    borderWidth: moderateScale(2),
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  photo: {
    height: moderateScale(125),
    width: moderateScale(125),
    borderRadius: moderateScale(125),
    borderColor: COLORS.lightGray,
    borderWidth: moderateScale(1),
    alignSelf: 'center'
  },
  photoIcon: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
  },
  photoTextError: {
    color: COLORS.error,
    fontSize: FONTS.small,
  },
  photoText: {
    color: COLORS.secondary,
    fontSize: FONTS.small,
  },
  firstTermsSentence: {
    paddingHorizontal: horizontalScale(METRICS.large15),
    fontSize: FONTS.word,
    color: COLORS.gray,
    textAlign: "center",
  },

  secondTermsSentence: {
    fontSize: FONTS.medium,
    textAlign: "center",
    color: COLORS.secondary,
  },

  signinButton: {

  },
});

export default Styles