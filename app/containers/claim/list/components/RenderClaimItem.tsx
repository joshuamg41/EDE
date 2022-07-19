import moment from 'moment';
import React, { FunctionComponent } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../../../../components/text/Text';
import { ClaimResponseItem } from '../../../../services/claim/ClaimServiceConstants';
import { navigate } from '../../../../services/NavigationService';
import { COLORS, FONTS, METRICS } from '../../../../themes';
import ApplicationStyles from '../../../../themes/ApplicationStyles';
import { horizontalScale, verticalScale } from '../../../../utils/StyleHelpers';

const RenderClaimItem: FunctionComponent<RenderClaimItemProp> = props => {
  const { item } = props
  return (
    <TouchableHighlight
      onPress={() => navigate('ClaimDetail', item)}
      underlayColor={COLORS.lightGray}
      style={Styles.itemContent}
    >
      <View style={ApplicationStyles.row}>
        <View style={ApplicationStyles.flex1}>
          <Text theme='titleMedium' style={Styles.title}>Motivo: {item?.issue_id}</Text>
          <Text>Estatus: {item?.status}</Text>
          <Text style={Styles.body}>{moment(item?.created_at, 'YYYY-MM-DD HH:mm:ss').format('DD/MMM/YYYY')}</Text>
        </View>
        <View style={ApplicationStyles.flex0}>
          <MaterialCommunityIcons
            name='file-pdf'
            size={FONTS.smallIcon}
            color={COLORS.tertiary}
          />
        </View>
      </View>
    </TouchableHighlight>
  )
}

interface RenderClaimItemProp {
  item?: ClaimResponseItem;
  index: number;
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

export default RenderClaimItem