import React, { FunctionComponent } from 'react';
import { ImageStyle, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import CheckRender from '../../../components/security/CheckRender';
import Text from '../../../components/text/Text';
import { COLORS, METRICS } from '../../../themes';
import { horizontalScale, moderateScale, verticalScale } from '../../../utils/StyleHelpers';

const RenderChat: FunctionComponent<RenderChatProp> = props => {
  const { item } = props
  return (
    <View style={{ flexDirection: 'row' }}>

      <CheckRender allowed={item?.user_id !== 2}>
        <View style={{ flex: 1 }} />
      </CheckRender>

      {/* @ts-ignore */}
      <View style={Styles.container(2 == item?.user_id)}>
        {/* @ts-ignore */}
        <Text style={Styles.text}>{item?.text}</Text>
      </View>

      <CheckRender allowed={2 == item?.user_id}>
        <View style={{ flex: 1 }} />
      </CheckRender>
    </View>
  )
}

interface RenderChatProp {
  item?: {
    id: number;
    user_id: number;
    request_id: number;
    text: string;
    created_at: string;
    updated_at: string;
  };
  index: number;
}

const Styles = StyleSheet.create({
  //@ts-ignore
  container: (sender: boolean): ViewStyle | TextStyle | ImageStyle => ({
    backgroundColor: sender && COLORS.primaryOpacity || undefined,
    marginHorizontal: horizontalScale(METRICS.large15),
    paddingHorizontal: horizontalScale(METRICS.medium10),
    paddingVertical: verticalScale(METRICS.medium10),
    borderRadius: moderateScale(METRICS.large15),
    borderColor: !sender && COLORS.primaryOpacity || undefined,
    borderWidth: !sender ? 1 : 0,
    flexShrink: 1,
  }),
  //@ts-ignore
  text: {
    textAlign: 'left',
  },
})

export default RenderChat