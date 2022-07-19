import React, { FunctionComponent } from 'react';
import { View, ViewProps } from "react-native";
import METRICS from '../../themes/Metrics';
import { horizontalScale, verticalScale } from '../../utils/StyleHelpers';

const Separator: FunctionComponent<propTypes> = props => {
  return (
    <View
      style={{ height: verticalScale(props.height), backgroundColor: props.color, width: horizontalScale(props.width) }}
    />
  )
};

interface propTypes extends ViewProps {
  height?: number;
  color?: string;
  width?: number;
}

const defaultProps = {
  height: METRICS.xLarge20,
  color: 'transparent',
  width: METRICS.large15,
}

Separator.defaultProps = defaultProps;

export default React.memo(Separator);