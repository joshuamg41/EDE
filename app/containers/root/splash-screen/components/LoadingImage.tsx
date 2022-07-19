import React, { FunctionComponent } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import Images from '../../../../assets/images';
import Separator from '../../../../components/separator/Separator';
import Text from '../../../../components/text/Text';
import { COLORS, FONTS_FAMILY } from '../../../../themes';
import { IS_IOS, moderateScale } from '../../../../utils/StyleHelpers';

const LoadingImage: FunctionComponent<propTypes> = props => {
  return (
    <ImageBackground
      source={Images.palm_background}
      style={Styles.imageBackground}
      resizeMode='cover'
    >
      <Separator height={IS_IOS ? 35 : 15} />
      <Text style={Styles.welcomeText}>Ministerio de Turismo</Text>
    </ImageBackground>
  )
}

interface propTypes {

}

LoadingImage.defaultProps = {

}

const Styles = StyleSheet.create({
  imageBackground: {
    height: '100%',
    width: '100%',
  },
  welcomeText: {
    fontSize: moderateScale(28.1),
    textAlign: 'center',
    color: COLORS.white,
    fontFamily: FONTS_FAMILY.regular.body,
  },
})

export default React.memo(LoadingImage)