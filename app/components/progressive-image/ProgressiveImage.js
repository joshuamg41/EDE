import React, { useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

const ProgressiveImage = props => {
  const {
    source,
    style,
  } = props
  const imageAnimated = useRef(new Animated.Value(0)).current;

  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View style={[Styles.container, style]}>
      <Animated.Image
        {...props}
        source={source}
        style={[Styles.imageOverlay, { opacity: imageAnimated }, style]}
        onLoad={onImageLoad}
      />
    </View>
  )
};

const Styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },

  container: {
    backgroundColor: '#e1e4e8',
  },
});

export default ProgressiveImage