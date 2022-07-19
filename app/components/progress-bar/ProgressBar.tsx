import { ProgressBarAndroidProps } from '@react-native-community/progress-bar-android';
import React, { FunctionComponent } from 'react';
import * as Progress from 'react-native-progress';
import { COLORS, METRICS } from '../../themes';
import { horizontalScale, moderateScale, viewportWidth } from '../../utils/StyleHelpers';

const ProgressBar: FunctionComponent<ProgressBarProps> = props => {
  return (
    <Progress.Bar
      {...props}
    />
  )
};

interface ProgressBarProps extends ProgressBarAndroidProps {

}

const defaultProps = {
  width: viewportWidth - horizontalScale(METRICS.xxLarge30),
  height: moderateScale(METRICS.medium10),
  color: COLORS.success,
  borderRadius: moderateScale(METRICS.medium10),
  borderWidth: 0,
  unfilledColor: COLORS.grayPlaceholder,
}

ProgressBar.defaultProps = defaultProps;

export default React.memo(ProgressBar);