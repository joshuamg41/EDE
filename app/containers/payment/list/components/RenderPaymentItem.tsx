import moment from 'moment';
import React, { FunctionComponent } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckRender from '../../../../components/security/CheckRender';
import Text from '../../../../components/text/Text';
import { navigate } from '../../../../services/NavigationService';
import { COLORS, FONTS, METRICS } from '../../../../themes';
import ApplicationStyles from '../../../../themes/ApplicationStyles';
import { horizontalScale, verticalScale } from '../../../../utils/StyleHelpers';

const RenderPaymentItem: FunctionComponent<RenderPaymentItemProp> = props => {
  return (
    <TouchableHighlight
      onPress={() => navigate('PaymentDetail')}
      underlayColor={COLORS.lightGray}
      style={Styles.itemContent}
      disabled={true}
    >
      <View style={ApplicationStyles.row}>
        <View style={ApplicationStyles.flex1}>
          <CheckRender allowed={!props.disabled}>
            <Text theme='titleMedium' style={Styles.title}>Número de aprobación: {props.item?.approval_number || "Validando"}</Text>
          </CheckRender>
          <Text>Concepto: {props.item?.concept}</Text>
          <Text style={Styles.body}>RD$ {props.item?.price}</Text>
          <Text style={Styles.body}>{moment(props.item?.created_at, 'YYYY-MM-DD HH:mm:ss').format('DD/MMM/YYYY')}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

interface RenderPaymentItemProp {
  item?: {
    id: number;
    concept: string;
    description: null | string;
    payment_method: null | string;
    approval_number: null | string;
    price: string;
    coin: string;
    request_id: number;
    created_at: string;
    updated_at: string;
  };
  index: number;
  disabled?: boolean;
}

const Styles = StyleSheet.create({
  itemContent: {
    paddingVertical: verticalScale(METRICS.large15),
    paddingHorizontal: horizontalScale(METRICS.large15),
    backgroundColor: COLORS.white,
    borderColor: COLORS.tertiaryOpacity,
  },
  title: {
    color: COLORS.tertiary,
  },
  body: {
    color: COLORS.gray,
  },
});

export default RenderPaymentItem