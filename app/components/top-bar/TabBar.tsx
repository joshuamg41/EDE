import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import React, {FunctionComponent} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, METRICS} from '../../themes';
import {searchInString} from '../../utils/StringUtil';
import {horizontalScale, verticalScale} from '../../utils/StyleHelpers';
import Separator from '../separator/Separator';
import Text from '../text/Text';

const TopBar: FunctionComponent<TopBarPropTypes> = props => {
  const {state, descriptors, navigation, position} = props;
  return (
    <View style={Styles.container}>
      {state.routes
        .filter(route => !searchInString(route.name, 'Example'))
        .map((route, index) => {
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
              key={route.key}>
              <View style={[Styles.buttonView]}>
                <Text
                  theme="titleMedium"
                  style={[
                    Styles.title,
                    isFocused
                      ? {color: COLORS.primary}
                      : {color: COLORS.primaryOpacity},
                  ]}>
                  {label}
                </Text>
                <Separator height={METRICS.small5} />
                <View
                  style={[
                    Styles.bottomIndicator,
                    isFocused
                      ? {backgroundColor: COLORS.secondary}
                      : {backgroundColor: COLORS.grayPlaceholder},
                  ]}
                />
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
    alignItems: 'flex-end',
    paddingHorizontal: horizontalScale(METRICS.large15),
  },
  buttonTouchable: {
    flex: 1,
  },
  buttonView: {},
  title: {
    textAlign: 'center',
    fontSize: 12,
  },
  bottomIndicator: {
    height: verticalScale(2),
    width: '100%',
  },
});

export interface TopBarPropTypes extends MaterialTopTabBarProps {}

export default TopBar;
