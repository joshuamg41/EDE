import React, { FunctionComponent } from 'react';
import { Image, ImageSourcePropType, StyleSheet, TextProps, View } from 'react-native';
import { useSelector } from 'react-redux';
import Images from '../../assets/images';
import { RootState } from '../../stores/AppReducers';
import { COLORS } from '../../themes';
import { moderateScale } from '../../utils/StyleHelpers';

const UserPhoto: FunctionComponent<propTypes> = props => {
  const { user } = useSelector((state: RootState) => state.signin)

  return (
    <View style={Styles.container}>
      <Image
        source={props.imageUri ||  (user?.data?.profile_img && { uri: user?.data?.profile_img })  || (user.data?.sex == 'F' ? Images.icon_profile_female : Images.icon_profile_male)}
        style={Styles.photo}
        resizeMode='cover'
      />
    </View>
  )
};

interface propTypes extends TextProps {
  children?: string | string[] | Element;
  imageUri?: ImageSourcePropType;
}

UserPhoto.defaultProps = {
  imageUri: undefined
}

const Styles = StyleSheet.create({
  container: {
    height: moderateScale(125),
    width: moderateScale(125),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  photo: {
    height: '100%',
    width: '100%',
    borderRadius: moderateScale(125),
    borderColor: COLORS.lightGray,
    borderWidth: 1,
  },
})


export default UserPhoto