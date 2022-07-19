import React, { FunctionComponent } from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import { COLORS } from '../../themes';
import Metrics from '../../themes/Metrics';
import { moderateScale } from '../../utils/StyleHelpers';
import CheckRender from '../security/CheckRender';
import Separator from '../separator/Separator';

const Loading: FunctionComponent<propTypes> = props => {
  return (
    <CheckRender allowed={props.isLoading}>
      <ActivityIndicator
        {...props}
        color={props.color}
        size={
          (props.size == 'large' && moderateScale(30)) ||
          (props.size == 'small' && moderateScale(20) ||
            props.size)
        }
      />
      <CheckRender allowed={props.bottomSeparate}>
        <Separator />
      </CheckRender>
    </CheckRender>
  )
};

interface propTypes extends ActivityIndicatorProps {
  isLoading?: boolean;
  color?: string;
  bottomSeparate?: boolean;
}

const defaultProps = {
  size: moderateScale(30),
  color: COLORS.white,
  style: {
    padding: moderateScale(Metrics.medium10),
  },
  isLoading: false,
}

Loading.defaultProps = defaultProps;

export default React.memo(Loading);