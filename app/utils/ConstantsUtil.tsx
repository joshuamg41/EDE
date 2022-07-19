import { RefreshControlProps } from 'react-native';
import { COLORS } from '../themes';
import { moderateScale } from './StyleHelpers';

export const RefreshControlBaseProps: RefreshControlProps = {
  colors: [COLORS.white],
  progressBackgroundColor: COLORS.tertiary,
  tintColor: COLORS.tertiary,
  progressViewOffset: moderateScale(30),
  refreshing: false,
  title: 'Cargando',
  titleColor: COLORS.tertiary,
}