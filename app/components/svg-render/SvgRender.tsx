import React, {FunctionComponent, StatelessComponent} from 'react';
import {
  ImageURISource,
  StyleProp,
  StyleSheet,
  View,
  Text,
  ViewStyle,
  Alert,
} from 'react-native';
import {SvgProps} from 'react-native-svg';
import SVG from '../../assets/svg/SVG';
import {COLORS} from '../../themes';
import {moderateScale} from '../../utils/StyleHelpers';
import CheckRender from '../security/CheckRender';

const SvgRender: FunctionComponent<propTypes> = props => {
  console.log(props.label);
  return (
    <View style={[Styles.container, props.containerStyle]}>
      <CheckRender allowed={props.Svg}>
        {/* @ts-ignore */}
        <props.Svg width={props.size} height={props.size} fill={props.color} />
      </CheckRender>
    </View>
  );
};

interface propTypes {
  size?: number | string;
  color?: string;
  Svg?: StatelessComponent<SvgProps>;
  containerStyle?: StyleProp<ViewStyle>;
  label?: string;
}

SvgRender.defaultProps = {
  Svg: SVG.svg_home,
};

const Styles = StyleSheet.create({
  container: {},
});

export default React.memo(SvgRender);
