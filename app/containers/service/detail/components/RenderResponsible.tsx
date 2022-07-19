import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Separator from '../../../../components/separator/Separator';
import Text from '../../../../components/text/Text';
import { COLORS, FONTS } from '../../../../themes';
import ApplicationStyles from '../../../../themes/ApplicationStyles';
import LinkUtil from '../../../../utils/LinkUtil';
import { cleanNumber } from '../../../../utils/StringUtil';

const RenderResponsible: FunctionComponent<propTypes> = props => {
  const { item } = props
  //Rendering
  return (
    <View style={Styles.container}>
      <View style={ApplicationStyles.row}>
        <Ionicons
          name="person-outline"
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
      <View style={[ApplicationStyles.row]}>
        <Ionicons
          name="mail-outline"
          size={FONTS.mediumIcon}
          color={COLORS.tertiary}
        />
        <Separator />
        <Text
          style={Styles.link}
          onPress={() => LinkUtil.sendEmail(item?.email)}>
          {item?.email}
        </Text>
      </View>
      <View style={[ApplicationStyles.row]}>
        <Ionicons
          name="call-outline"
          size={FONTS.mediumIcon}
          color={COLORS.tertiary}
        />
        <Separator />
        <Text
          style={Styles.link}
          onPress={() => LinkUtil.call(cleanNumber(item?.phone))}>
          {item?.phone}
        </Text>
      </View>
    </View>
  );
}

interface propTypes {
  item?: {
    id: number;
    name: string;
    email: string;
    phone: string;
    insti_id: number;
    created_at: string;
    updated_at: string;
    pivot: {
      service_id: number;
      service_responsible_id: number
    }
  };
  index?: number;
}

RenderResponsible.defaultProps = {

}

const Styles = StyleSheet.create({
  container: {

  },
  title: {
    flexShrink: 1,
  },
  
  link: {
    color: 'blue',
    textDecorationLine: "underline",
  },
})

export default RenderResponsible