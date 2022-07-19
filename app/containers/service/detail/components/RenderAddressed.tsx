import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Separator from '../../../../components/separator/Separator';
import Text from '../../../../components/text/Text';
import { COLORS, FONTS } from '../../../../themes';

const RenderAddressed: FunctionComponent<propTypes> = props => {
  const { item } = props
  //Rendering
  return (
    <View style={Styles.container}>
      <Ionicons
        name="person-circle-outline"
        size={FONTS.mediumIcon}
        color={COLORS.tertiary}
      />
      <Separator />
      <Text
        style={Styles.title}
      >
        {item?.name}
      </Text>
    </View>
  );
}

interface propTypes {
  item?: {
    id: number;
    name: string;
    icon: string;
    created_at: string;
    updated_at: string;
    pivot: {
      services_service_id: number;
      addresseds_addressed_id: number;
    }
  };
  index?: number;
}

RenderAddressed.defaultProps = {

}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flexShrink: 1,
  },
})

export default RenderAddressed