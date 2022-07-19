import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { COLORS, METRICS } from '../../../themes';
import { moderateScale } from '../../../utils/StyleHelpers';
import TrashIcon from '../../icon/TrashIcon';
import ProgressiveImage from '../../progressive-image/ProgressiveImage';
import { ItemProps } from '../AttachConstants';

const RenderImage: FunctionComponent<propTypes> = props => {
  const item = props.item
  const index = props.index

  return (
    <View style={Styles.imageContainer}>
      <ProgressiveImage
        resizeMode='cover'
        style={Styles.image}
        source={{
          uri: item?.uri,
        }}
      />
      <View style={Styles.iconContainer}>
        <TrashIcon
          onTouchablePress={() => props.removeAttach(index)}
          color={COLORS.white}
        />
      </View>
    </View >
  )
}

interface propTypes extends ItemProps {
  removeAttach: (index: number) => void;
  children?: JSX.Element | JSX.Element[] | undefined;
}

RenderImage.defaultProps = {

}

const Styles = StyleSheet.create({
  imageContainer: {
    width: moderateScale(150),
    height: moderateScale(100),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(METRICS.medium10),
    borderWidth: moderateScale(0.5),
    borderColor: COLORS.grayPlaceholder,
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.error,
    padding: moderateScale(2),
    borderTopRightRadius: moderateScale(METRICS.medium10),
    borderBottomLeftRadius: moderateScale(METRICS.small5),
  },
});

export default RenderImage