import React, { FunctionComponent } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { COLORS } from '../../themes';
import Loading from '../loading/Loading';
import CheckRender from '../security/CheckRender';
import Separator from '../separator/Separator';
import Text from '../text/Text';

const ListEmpty: FunctionComponent<propTypes> = props => {
  return (
    <View style={[Styles.flex1, props.containerStyle]}>
      <CheckRender allowed={props.separator}>
        <Separator />
      </CheckRender>
      <Loading
        isLoading={props.isLoading}
        style={{}}
        bottomSeparate={props.bottomSeparate}
      />
      <CheckRender allowed={!props.isLoading}>
        <Text style={[Styles.errorText, { color: props.errorColor }]}>{props.errorText}</Text>
      </CheckRender>
      <CheckRender allowed={props.bottomSeparate}>
        <Separator />
      </CheckRender>
    </View>
  )
}

interface propTypes {
  errorText?: string;
  errorColor?: string;
  separator?: boolean;
  isLoading?: boolean;
  bottomSeparate?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

ListEmpty.defaultProps = {
  errorText: 'Aún no existen datos',
  errorColor: COLORS.tertiary,
  separator: true,
  isLoading: false,
}

const Styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
  },
})

export default React.memo(ListEmpty)