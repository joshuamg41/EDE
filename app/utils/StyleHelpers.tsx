import { Dimensions, PixelRatio, Platform } from 'react-native';
import Fonts from '../themes/Fonts';
import Colors from '../themes/Colors';

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const IS_IOS = Platform.OS === 'ios';
export const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

export const { width: screenWidth, height: screenHeight } = Dimensions.get(
  'screen'
)

export const horizontalScale = (size?: number): number =>
  PixelRatio.roundToNearestPixel(screenWidth / guidelineBaseWidth * (size ?? 1));
export const verticalScale = (size?: number): number =>
  PixelRatio.roundToNearestPixel(screenHeight / guidelineBaseHeight * (size ?? 1));
export const moderateScale = (size: number, factor = 0.5): number =>
  size + (horizontalScale(size) - size) * factor;


export const isSmallDevice: boolean = viewportWidth <= 365;