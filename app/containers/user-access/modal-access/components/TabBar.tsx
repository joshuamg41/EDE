import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import React, {FunctionComponent} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from '../../../../components/text/Text';
import {COLORS, METRICS} from '../../../../themes';
import {moderateScale, verticalScale} from '../../../../utils/StyleHelpers';

const TabBar: FunctionComponent<TabBarPropTypes> = props => {
  const {state, descriptors, navigation, position} = props;
  return (
    <View style={Styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // modify inputRange for custom behavior
        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            activeOpacity={0.5}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={Styles.buttonTouchable}
            key={route.key}
            disabled={isFocused}>
            <View
              style={[
                Styles.buttonView,
                isFocused
                  ? {backgroundColor: COLORS.primary, overflow: 'hidden'}
                  : {backgroundColor: COLORS.white},
              ]}>
              <Text
                style={[
                  isFocused
                    ? {color: COLORS.secondary}
                    : {color: COLORS.primary},
                ]}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopLeftRadius: moderateScale(METRICS.small5),
    borderTopRightRadius: moderateScale(METRICS.small5),
    borderBottomLeftRadius: moderateScale(METRICS.xLarge20),
    borderBottomRightRadius: moderateScale(METRICS.xLarge20),
  },
  buttonTouchable: {
    flex: 1,
  },
  buttonView: {
    height: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: moderateScale(METRICS.large15),
    borderTopRightRadius: moderateScale(METRICS.large15),
  },
});

export interface TabBarPropTypes extends MaterialTopTabBarProps {}

export default TabBar;
