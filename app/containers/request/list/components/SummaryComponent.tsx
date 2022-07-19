import React, { FunctionComponent } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import Separator from '../../../../components/separator/Separator';
import Text from '../../../../components/text/Text';
import { COLORS, FONTS, METRICS } from '../../../../themes';
import FONTS_FAMILY from '../../../../themes/FontsFamily';
 
const SummaryComponent: FunctionComponent<propTypes> = props => {
  return (
    <View style={Styles.container}>
      <Text style={Styles.description}>{props.description ?? "00"}</Text>
      <Separator height={METRICS.small5} />
      <Text style={Styles.title}>{props.title}</Text>
    </View>
  );
}

interface propTypes extends ViewProps {
  title: string;
  description?: string | number;
}

SummaryComponent.defaultProps = {

}

const Styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    color: COLORS.gray,
    fontSize: FONTS.medium,
    fontFamily: FONTS_FAMILY.regular.title,
    textAlign: 'center',
  },
  description: {
    color: COLORS.black,
    fontFamily: FONTS_FAMILY.medium.body,
    fontSize: FONTS.regular,
    textAlign: 'center',
  },
})

export default React.memo(SummaryComponent);