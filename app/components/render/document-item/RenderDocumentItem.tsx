import moment from 'moment';
import React, { FunctionComponent } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../../../components/text/Text';
import { navigate } from '../../../services/NavigationService';
import { COLORS, FONTS, METRICS } from '../../../themes';
import ApplicationStyles from '../../../themes/ApplicationStyles';
import { horizontalScale, verticalScale } from '../../../utils/StyleHelpers';
import CheckRender from '../../security/CheckRender';

const RenderDocumentItem: FunctionComponent<RenderDocumentItemProp> = props => {
  const localPress = () => {
    if (typeof props.onPress === 'function') {
      return props.onPress(props.item)
    } else {
      return navigate('DocumentDetail', props.item)
    }
  }

  return (
    <TouchableHighlight
      onPress={localPress}
      underlayColor={COLORS.lightGray}
      style={Styles.itemContent}
    >
      <View style={ApplicationStyles.row}>
        <View style={ApplicationStyles.flex1}>
          <Text theme='titleMedium' style={Styles.title}>{props.item?.name}</Text>
          <Text style={Styles.body}>{moment(props.item?.created_at, 'YYYY-MM-DD HH:mm:ss').format("D [de] MMMM [de] YYYY")}</Text>
        </View>
        <View style={ApplicationStyles.flex0}>
          <CheckRender allowed={props.item?.extension == 'pdf'}>
            <MaterialCommunityIcons
              name='file-pdf'
              size={FONTS.smallIcon}
              color={COLORS.tertiary}
            />
          </CheckRender>
          <CheckRender allowed={props.item?.extension != 'pdf'}>
            <MaterialCommunityIcons
              name='file-image'
              size={FONTS.smallIcon}
              color={COLORS.tertiary}
            />
          </CheckRender>
        </View>
      </View>
    </TouchableHighlight>
  )
}

interface RenderDocumentItemProp {
  item?: any;
  index: number;
  onPress?: (val: any) => void;
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

export default RenderDocumentItem