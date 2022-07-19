import moment from 'moment';
import React, { FunctionComponent } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import RenderColumn from '../../../../components/render/column/RenderColumn';
import RenderRow from '../../../../components/render/row/RenderRow';
import { DraftListItem } from '../../../../services/draft/DraftServiceConstants';
import { COLORS, METRICS } from '../../../../themes';
import { localToString } from '../../../../utils/StringUtil';
import { horizontalScale, moderateScale, verticalScale } from '../../../../utils/StyleHelpers';

const RenderDraftItem: FunctionComponent<RenderDraftItemProp> = props => {
  const { item } = props
  return (
    <TouchableHighlight
      onPress={() => props.onPress(localToString(item?.service?.id))}
      underlayColor={COLORS.lightGray}
      style={Styles.container}
    >
      <View>
        <RenderColumn
          title="Nombre servicio"
          body={item?.service?.name}
        />
        <RenderRow
          title1='Creado el'
          body1={moment(item?.service?.updated_at, "YYYY-MM-DD HH:mm:ss").format('DD/MMM/YYYY')}
          title2='Expira el'
          body2={moment(item?.service?.expire_at, "YYYY-MM-DD HH:mm:ss").format('DD/MMM/YYYY')}
        />
      </View>
    </TouchableHighlight>
  )
}

interface RenderDraftItemProp {
  item?: DraftListItem;
  index: number;
  onPress: (id: string) => void;
}

const Styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(METRICS.large15),
    paddingHorizontal: horizontalScale(METRICS.large15),
    marginHorizontal: horizontalScale(METRICS.large15),
    borderRadius: moderateScale(METRICS.small5),
    backgroundColor: COLORS.white,
    borderColor: COLORS.tertiaryOpacity,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  title: {
    color: COLORS.tertiary,
  },
  body: {
    color: COLORS.gray,
  },
});

export default RenderDraftItem