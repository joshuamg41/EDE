import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Images from '../../assets/images';
import { moderateScale } from '../../utils/StyleHelpers';

const MiturLogo: FunctionComponent<propTypes> = props => {
  return (
    <View style={Styles.imageContainer}>
      <Image
        style={Styles.imageIcon}
        resizeMode='contain'
        source={Images.logo_mitur_white}
      />
    </View>
  );
}

interface propTypes {

}

MiturLogo.defaultProps = {

}

const Styles = StyleSheet.create({
  imageContainer: {

  },
  imageIcon: {
    width: moderateScale(150),
    height: moderateScale(150),
  },
})

export default React.memo(MiturLogo);