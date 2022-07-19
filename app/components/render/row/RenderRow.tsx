import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS, FONTS, METRICS } from '../../../themes';
import ApplicationStyles from '../../../themes/ApplicationStyles';
import Separator from '../../separator/Separator';
import Text from '../../text/Text';

const RenderRow = (props: RenderRowProps) => {
  return (
    <View style={Styles.rowContainer}>
      <View style={ApplicationStyles.flex1}>
        <Text style={Styles.rowTitle}>{props.title1}</Text>
        <Text style={Styles.rowBody}>{props.body1}</Text>
      </View>
      <Separator width={METRICS.small5} />
      <View style={ApplicationStyles.flex1}>
        <Text style={Styles.rowTitle}>{props.title2}</Text>
        <Text style={Styles.rowBody}>{props.body2}</Text>
      </View>
    </View>
  )
}

interface RenderRowProps {
  title1?: string;
  title2?: string;
  body1?: string;
  body2?: string;
}

RenderRow.defaultProps = {

}

const Styles = StyleSheet.create({
  //RenderRow
  rowContainer: {
    flexDirection: 'row',
  },
  rowTitle: {
    fontSize: FONTS.word,
  },
  rowBody: {
    fontSize: FONTS.medium,
    color: COLORS.primary,
  },
})

export default React.memo(RenderRow);
