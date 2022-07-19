import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import Separator from '../../../../components/separator/Separator';
import Text from '../../../../components/text/Text';
import { COLORS, FONTS, METRICS } from '../../../../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RenderRequirement: FunctionComponent<propTypes> = props => {
  //Rendering
  return (
    <View style={Styles.container}>
      <Ionicons
        name="checkmark-circle-outline"
        size={FONTS.mediumIcon}
        color={COLORS.tertiary}
      />
      <Separator />
      <Text
        style={Styles.title}
      >
        {props.item?.name}
      </Text>
    </View>
  );
}

interface propTypes {
  item?: {
    name: string;
  };
  index?: number;
}

RenderRequirement.defaultProps = {

}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  title: {
    flexShrink: 1,
  },
})

export default RenderRequirement