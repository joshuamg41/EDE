import React, { FunctionComponent, StatelessComponent, useEffect, useRef, useState } from 'react';
import { Image, ImageStyle, StyleProp, StyleSheet, TextStyle, TouchableHighlight, View, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Images from '../../../../assets/images';
import SVG from '../../../../assets/svg/SVG';
import CheckRender from '../../../../components/security/CheckRender';
import Separator from '../../../../components/separator/Separator';
import SvgRender from '../../../../components/svg-render/SvgRender';
import Text from '../../../../components/text/Text';
import { navigate } from '../../../../services/NavigationService';
import { COLORS, FONTS, METRICS } from '../../../../themes';
import { moderateScale, verticalScale } from '../../../../utils/StyleHelpers';

const DrawerItem: FunctionComponent<DrawerItemProps> = props => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const mounted = useRef(false);

  //componentDidUpdate
  useEffect(() => {
    if (mounted.current) {
      if (showSubMenu) {
        // @ts-ignore
        props.scrollRef?.scrollTo({ x: 0, y: verticalScale(175), animated: true })
      } else {
        // @ts-ignore
        // props.scrollRef?.scrollTo({ x: 0, y: -verticalScale(50), animated: true })
      }
    }
    return () => { }
  }, [showSubMenu])

  //componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    return () => { mounted.current = false }
  }, [])

  //Misc
  const onPress = () => {
    if (props.subMenu) {
      setShowSubMenu(!showSubMenu);
      return;
    }
    if (typeof props.onPress == 'function') {
      props.onPress();
    } else if (typeof props.goTo == 'string') {
      navigate(props.goTo, { previousScreen: "Drawer" })
    }
  }

  return (
    <>
      <TouchableHighlight
        underlayColor={COLORS.lightGray}
        style={[Styles.outerContainer, props.touchableStyle]}
        onPress={onPress}
      >
        <View style={[Styles.innerContainer, props.viewStyle]}>
          <Separator />
          <View style={Styles.leftIcon}>
            <CheckRender allowed={props.imageIcon}>
              <Image
                style={[Styles.imageIcon, props.imageStyle]}
                source={props.imageIcon}
              />
            </CheckRender>
            <CheckRender allowed={props.iconName}>
              <CheckRender allowed={props.iconType == 'Ionicons'}>
                <Ionicons
                  name={props.iconName || "chevron-back"}
                  style={[Styles.vectorIcon, props.iconStyle]}
                />
              </CheckRender>
              <CheckRender allowed={props.iconType == 'MaterialCommunityIcons'}>
                <MaterialCommunityIcons
                  name={props.iconName || "face"}
                  style={[Styles.vectorIcon, props.iconStyle]}
                />
              </CheckRender>
            </CheckRender>
            <CheckRender allowed={props.Svg}>
              <SvgRender
                Svg={props.Svg || SVG.svg_home}
                size={moderateScale(METRICS.xLargeMedium25)}
                color={COLORS.tertiary}
              />
            </CheckRender>
            <CheckRender allowed={!props.imageIcon && !props.iconName && !props.Svg && props.leftSpace}>
              <View style={Styles.imageIcon} />
            </CheckRender>
          </View>
          <Separator />
          <View style={Styles.titleContainer}>
            <Text style={[Styles.title, props.textStyle]}>
              {props.name}
            </Text>
            <CheckRender allowed={props.subName}>
              <Text style={[Styles.subTitle, props.textStyle]}>
                {props.subName}
              </Text>
            </CheckRender>
          </View>
          <View style={Styles.rightIcon}>
            <CheckRender allowed={props.subMenu}>
              <View style={{ flex: 0 }}>
                <Image
                  source={showSubMenu ? Images.icon_arrow_up : Images.icon_arrow_down}
                  style={Styles.arrowIcon}
                />
              </View>
            </CheckRender>
          </View>
          <Separator />
        </View>
      </TouchableHighlight>
      <View>
        <CheckRender allowed={showSubMenu}>
          {props.children}
        </CheckRender>
      </View>
    </>
  );
}

export interface DrawerItemProps {
  onPress?: (a?: any) => void;
  goTo?: string;
  imageIcon?: any;
  name?: string;
  subMenu?: boolean;
  scrollRef?: JSX.Element;
  touchableStyle?: StyleProp<ViewStyle>;
  viewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  children?: JSX.Element | JSX.Element[] | undefined;
  iconName?: string;
  iconType?: 'Ionicons' | 'MaterialCommunityIcons';
  subName?: string;
  iconStyle?: StyleProp<TextStyle>;
  Svg?: StatelessComponent<SvgProps>;
  leftSpace?: boolean;
}

DrawerItem.defaultProps = {
  imageIcon: undefined,
  subMenu: undefined,
  viewStyle: {},
  textStyle: {},
  imageStyle: {},
  name: '',
  iconType: 'Ionicons',
  leftSpace: true,
}

const Styles = StyleSheet.create({
  outerContainer: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    minHeight: verticalScale(50),
    justifyContent: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIcon: {
    width: moderateScale(METRICS.xLargeMedium25),
    height: moderateScale(METRICS.xLargeMedium25),
    tintColor: COLORS.tertiary,
  },
  leftIcon: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vectorIcon: {
    fontSize: moderateScale(METRICS.xLargeMedium25),
    color: COLORS.tertiary,
  },
  arrowIcon: {
    width: moderateScale(METRICS.xLargeMedium25),
    height: moderateScale(METRICS.xLargeMedium25),
    tintColor: COLORS.gray,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    fontSize: FONTS.medium,
    color: COLORS.tertiary,
    textAlignVertical: 'bottom',
  },
  subTitle: {
    fontSize: FONTS.word,
    color: COLORS.gray,
    textAlignVertical: 'bottom',
  },
  rightIcon: {

  },
})

export default React.memo(DrawerItem)
