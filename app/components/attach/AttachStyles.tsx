import { StyleSheet } from 'react-native';
import { COLORS, FONTS, METRICS } from '../../themes';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/StyleHelpers';

const Styles = StyleSheet.create({
  title: {
    
  },
  container: {

  },

  //Modalize
  modalizeTitle: {
    textAlign: 'center',
    paddingHorizontal: verticalScale(METRICS.medium10),
  },
  modalizeContent: {
    paddingTop: verticalScale(METRICS.xLarge20),
  },
  handleStyle: {
    backgroundColor: COLORS.primary,
    borderWidth: moderateScale(0.5),
    borderColor: COLORS.white,
  },
  closeDrawer: { 
    textAlign: 'center', 
    color: COLORS.red 
  },

  //MyDocuments Modal
  documentContainer: {
    backgroundColor: COLORS.primaryOpacity,
    flex: 1,
  },
  documentTitle: {
    fontSize: FONTS.title,
    flex: 1,
  },
  documentInnerContent: {
    backgroundColor: COLORS.white,
    flexGrow: 1,
    paddingVertical: verticalScale(METRICS.large15),
  },
  documentCloseTouchable: {
    position: 'absolute',
    top: moderateScale(-5),
    right: moderateScale(-5),
    backgroundColor: COLORS.error,
    height: moderateScale(30),
    width: moderateScale(30),
    borderRadius: moderateScale(15),
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Styles