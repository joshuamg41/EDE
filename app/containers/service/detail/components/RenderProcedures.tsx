import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import Separator from '../../../../components/separator/Separator';
import Text from '../../../../components/text/Text';
import { FONTS, FONTS_FAMILY } from '../../../../themes';

const RenderProcedures: FunctionComponent<propTypes> = props => {
  //Rendering
  return (
    <View style={Styles.container}>
      <Text
        style={Styles.number}
      >
        {props.index + 1}.
      </Text>
      <Separator />
      <Text
        style={Styles.title}
      >
        {props.item?.step}
      </Text>
    </View>
  );
}

interface propTypes {
  item?: {
    id: number;
    step: string;
    type: string;
    created_at: string;
    updated_at: string;
    pivot: {
      services_service_id: number;
      procedures_procedure_id: number;
    }
  };
  index: number;
}

RenderProcedures.defaultProps = {

}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  number: {
    fontSize: FONTS.title,
    fontFamily: FONTS_FAMILY.medium.body,
  },
  title: {
    flexShrink: 1,
  },
})

export default RenderProcedures