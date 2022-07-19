import React, { FunctionComponent } from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { IModalListInDto } from 'react-native-picker-modal-view/dist/Interfaces';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FONTS, METRICS } from '../../themes';
import COLORS from '../../themes/Colors';
import { horizontalScale } from '../../utils/StyleHelpers';
import { isEmpty } from '../../utils/ValidationUtil';
import Icon, { IconPropTypes } from '../icon/Icon';
import Loading from '../loading/Loading';
import CheckRender from '../security/CheckRender';
import Text from '../text/Text';

export const PickerButton: FunctionComponent<propTypes> = props => {
  const textColorStyle: StyleProp<TextStyle> = {
    color: !isEmpty(props.value) ? COLORS.gray : COLORS.grayPlaceholder,
  }

  return (
    <TouchableOpacity
      {...props}
      style={Styles.container}
    >
      <CheckRender allowed={!props.isLoading}>
        <Icon
          {...props}
        />
        <View style={Styles.primaryView}>
          <Text
            style={[Styles.title, textColorStyle]}
            numberOfLines={1}
          >
            {props.value && props.value.Name || props.placeholder}
          </Text>
        </View>
        <View style={Styles.secondaryView}>
          <Ionicons
            name="caret-down"
            style={[Styles.icon, textColorStyle]}
          />
        </View>
      </CheckRender>
      <Loading
        style={Styles.loading}
        color={props.color}
        isLoading={props.isLoading}
      />
    </TouchableOpacity>
  );
}

interface propTypes extends TouchableOpacityProps, IconPropTypes {
  color?: string;
  placeholder?: string;
  value?: IModalListInDto;
  isLoading?: boolean;
  iconName?: string;
}

PickerButton.defaultProps = {
  color: COLORS.primary
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(METRICS.medium10),
  },
  title: {
    fontSize: FONTS.regular,
    color: COLORS.gray,
  },
  primaryView: {
    flex: 1,
  },
  secondaryView: {
    flex: 0,
  },
  icon: {
    fontSize: FONTS.smallIcon,
    color: COLORS.gray,
  },
  loading: {
    padding: 0,
  }
});