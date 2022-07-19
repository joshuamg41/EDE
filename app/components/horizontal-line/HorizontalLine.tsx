import React, { FunctionComponent } from 'react';
import { ColorValue, StyleSheet, View, ViewProps } from "react-native";
import { COLORS } from '../../themes';
import METRICS from '../../themes/Metrics';
import { horizontalScale, verticalScale } from '../../utils/StyleHelpers';

const HorizontalLine: FunctionComponent<HorizontalLineProps> = props => {
  return (
    <View
      style={[
        Styles.horizontalSeparator,
        {
          backgroundColor: props.color,
          height: verticalScale(props.height),
          marginHorizontal: horizontalScale(props.marginHorizontal),
        }]}
    />
  )
};

interface HorizontalLineProps {
  height?: number;
  color?: ColorValue;
  marginHorizontal?: number;
}

const defaultProps = {
  height: verticalScale(1),
  color: COLORS.lightGray,
  marginHorizontal : METRICS.large15,
}

HorizontalLine.defaultProps = defaultProps;

const Styles = StyleSheet.create({
  horizontalSeparator: {
    flex: 1,
  },
});

export default React.memo(HorizontalLine);