import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React, {FunctionComponent} from 'react';
import {SafeAreaView, TouchableWithoutFeedback, View} from 'react-native';
import SVG from '../../../assets/svg/SVG';
import CheckRender from '../../../components/security/CheckRender';
import SvgRender from '../../../components/svg-render/SvgRender';
import Text from '../../../components/text/Text';
import {navigate, navigateAndReset} from '../../../services/NavigationService';
import {store} from '../../../stores';
import {RootState} from '../../../stores/AppReducers';
import {COLORS} from '../../../themes';
import {localToArray} from '../../../utils/ArrayUtil';
import {localToString} from '../../../utils/StringUtil';
import {moderateScale} from '../../../utils/StyleHelpers';
import Styles from './BottomTabStyles';

interface iconsProps {
  [key: string]: any;
}

const icons: iconsProps = {
  ServiceNavigator: SVG.svg_add,
  // Notification: SVG.svg_bell,
  HomeNavigator: SVG.svg_home,
  DocumentNavigator: SVG.svg_document,
  ProfileNavigator: SVG.svg_settings,
};

const names: iconsProps = {
  HomeNavigator: 'Inicio',
  // Notification: 'Notificaciones',
  ServiceNavigator: 'Solicitar',
  DocumentNavigator: 'Mis Servicios',
  ProfileNavigator: 'Perfil',
};

const screens = [
  'HomeNavigator',
  // 'Notification',
  'ServiceNavigator',
  'DocumentNavigator',
  'ProfileNavigator',
];

const BottomTab: FunctionComponent<BottomTabBarProps> = props => {
  const HistoryLength = localToArray(props.state?.history).length;
  const ScreenKey = localToArray(props.state?.history)[HistoryLength - 1]?.key;
  const ScreenName = localToArray(props.state?.routeNames).find(routeName =>
    localToString(ScreenKey).includes(routeName),
  );
  const state: RootState = store?.getState();

  const onPressTab = (name: string) => {
    navigate(name);
  };

  const hitSlop = {top: moderateScale(10), right: 0, bottom: 0, left: 0};
  return (
    <SafeAreaView>
      <View style={Styles.container}>
        {screens.map((name, index) => {
          if (!screens.includes(name)) {
            return <View />;
          }

          const focus = name == ScreenName;
          return (
            <TouchableWithoutFeedback
              onPress={() => onPressTab(name)}
              key={name}
              hitSlop={hitSlop}>
              <View style={Styles.buttonInnerContainer}>
                <SvgRender
                  size={moderateScale(28)}
                  color={focus ? COLORS.secondary : COLORS.primary}
                  Svg={icons[name]}
                />

                <Text
                  theme="titleRegular"
                  style={[focus ? Styles.textFocused : Styles.text]}>
                  {names[name]}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default BottomTab;
