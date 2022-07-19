import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTS, METRICS } from '../../../themes';
import { moderateScale } from '../../../utils/StyleHelpers';
import TrashIcon from '../../icon/TrashIcon';
import CheckRender from '../../security/CheckRender';
import Text from '../../text/Text';
import { ItemProps } from '../AttachConstants';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

const RenderDoc: FunctionComponent<propTypes> = props => {
  const item = props.item
  const index = props.index

  return (
    <View style={Styles.docContainer}>
      <CheckRender allowed={[undefined, null, 'pdf'].includes(props.extension)}>
        <MaterialCommunityIcons
          name='file-pdf-outline'
          size={FONTS.smallIcon}
          color={COLORS.red}
          style={Styles.pdfIcon}
        />
      </CheckRender>
      <CheckRender allowed={props.extension == 'application/vnd.google-earth.kmz'}>
        <MaterialCommunityIcons
          name='google-earth'
          size={FONTS.smallIcon}
          color={COLORS.tertiary}
          style={Styles.pdfIcon}
        />
      </CheckRender>
      {/* @ts-ignore */}
      <CheckRender allowed={[DocumentPicker.types.xls, DocumentPicker.types.xlsx].includes(props.extension)}>
        <MaterialCommunityIcons
          name='file-excel-outline'
          size={FONTS.smallIcon}
          color={COLORS.tertiary}
          style={Styles.pdfIcon}
        />
      </CheckRender>
      <Text
        style={Styles.docTitle}
        numberOfLines={2}
        ellipsizeMode='middle'
      >
        {item.name}
      </Text>
      <View style={Styles.iconContainer}>
        <TrashIcon
          onTouchablePress={() => props.removeAttach(index)}
          color={COLORS.white}
        />
      </View>
    </View>
  )
}

interface propTypes extends ItemProps {
  removeAttach: (index: number) => void;
  children?: JSX.Element | JSX.Element[] | undefined;
  extension?: string;
}

RenderDoc.defaultProps = {

}

const Styles = StyleSheet.create({
  docContainer: {
    width: moderateScale(150),
    height: moderateScale(100),
    paddingHorizontal: moderateScale(METRICS.small5),
    paddingVertical: moderateScale(METRICS.small5),
    borderRadius: moderateScale(METRICS.medium10),
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: moderateScale(0.5),
    borderColor: COLORS.grayPlaceholder,
  },
  pdfIcon: {
    textAlign: 'center',
  },
  docTitle: {
    fontSize: FONTS.regular,
    color: COLORS.primary,
    textAlign: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: moderateScale(-1),
    right: moderateScale(-1),
    backgroundColor: COLORS.error,
    padding: moderateScale(2),
    borderTopRightRadius: moderateScale(METRICS.medium10),
    borderBottomLeftRadius: moderateScale(METRICS.small5),
  },
});

export default RenderDoc