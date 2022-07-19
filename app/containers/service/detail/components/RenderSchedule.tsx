import moment from 'moment';
import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Separator from '../../../../components/separator/Separator';
import Text from '../../../../components/text/Text';
import { COLORS, FONTS } from '../../../../themes';

const RenderSchedule: FunctionComponent<propTypes> = props => {
  //Rendering
  return (
    <View style={Styles.container}>
      <Ionicons
        name="checkbox-outline"
        size={FONTS.mediumIcon}
        color={COLORS.tertiary}
      />
      <Separator />
      <Text
        style={Styles.title}
      >
        {props.item?.day} | {moment(props.item?.init, 'HH:mm:SS').format('h:mm a')} - {moment(props.item?.finit, 'HH:mm:SS').format('h:mm a')}
      </Text>
    </View>
  );
}

interface propTypes {
  item?: {
    id: number;
    day: string;
    init: string;
    finit: string;
    created_at: string;
    updated_at: string;
    pivot: {
      services_service_id: number;
      schedules_schedule_id: number;
    }
  };
  index?: number;
}

RenderSchedule.defaultProps = {

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

export default RenderSchedule