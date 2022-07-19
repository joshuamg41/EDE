import moment from 'moment';
import React, { FunctionComponent, useState } from 'react';
import { ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import RnDatePicker, { DateTimePickerProps } from "react-native-modal-datetime-picker";
import { COLORS, FONTS, FONTS_FAMILY, METRICS } from '../../themes';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/StyleHelpers';
import Icon from '../icon/Icon';
import Loading from '../loading/Loading';
import CheckRender from '../security/CheckRender';
import Separator from '../separator/Separator';

const DatePicker: FunctionComponent<propTypes> = props => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const changeVisible = () => {
    setIsVisible(!isVisible)
  }

  const onConfirm = (value?: Date) => {
    setIsVisible(false)
    props.onValueChange(value)
  }

  const onCancel = () => {
    setIsVisible(false)
    props.onValueChange(undefined)
  }

  const shouldShowError = props.showError
  const errorStyle: StyleProp<ViewStyle> = {
    borderColor: (shouldShowError && COLORS.error) || COLORS.lightGray,
    borderWidth: moderateScale(1),
  }
  const textColorStyle: StyleProp<TextStyle> = {
    color: props.value ? COLORS.gray : COLORS.grayPlaceholder,
  }
  const imageColorStyle: StyleProp<ImageStyle> = {
    tintColor: props.value ? COLORS.gray : COLORS.grayPlaceholder,
  }

  return (
    <>
      <TouchableOpacity
        style={[Styles.container, { marginHorizontal: props.widthSeparator }]}
        onPress={changeVisible}
        disabled={props.disabled}
      >
        <View
          style={[
            Styles.content,
            errorStyle,
          ]}>
          <Loading
            size='small'
            isLoading={props.isLoading}
          />
          <CheckRender allowed={!props.isLoading}>
            <Icon
              {...props}
            />
            <Text style={[Styles.input, textColorStyle]}>
              {(props.value && moment(props.value).format(props.labelFormat)) || props.placeholder}
            </Text>
            <RnDatePicker
              {...props}
              isVisible={isVisible}
              minuteInterval={undefined}
              accessibilityLabel='DatePicker'
              onConfirm={onConfirm}
              onCancel={onCancel}
              date={props.value || props.minimumDate || new Date()}
              cancelTextIOS="Cancelar"
              confirmTextIOS="Aceptar"
              // headerTextIOS={props.placeholder}
            />
          </CheckRender>
        </View>
        <CheckRender allowed={!props.isLoading && shouldShowError}>
          <Separator height={METRICS.medium10} />
          <Text style={[Styles.errorText]}>
            {typeof props.showError == 'string' ? props.showError : props.errorText}
          </Text>
        </CheckRender>
      </TouchableOpacity>
      <CheckRender allowed={props.bottomSeparate}>
        <Separator />
      </CheckRender>
    </>
  );
};

interface propTypes extends Omit<DateTimePickerProps, 'onConfirm' | 'onCancel'> {
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  value?: Date;
  onValueChange: (val?: Date) => void;
  labelFormat?: string;
  children?: JSX.Element | JSX.Element[] | undefined;
  bottomSeparate?: boolean;
  widthSeparator?: number;
  iconName?: string;
  image?: ImageSourcePropType;
  errorText?: string;
  showError?: boolean | string;
}

DatePicker.defaultProps = {
  is24Hour: false,
  isLoading: false,
  disabled: false,
  value: undefined,
  placeholder: '',
  labelFormat: 'DD/MMM/YYYY',
  onValueChange: () => console.log('Changed'),
  showError: false,
  bottomSeparate: true,
  widthSeparator: horizontalScale(METRICS.large15),
}

const Styles = StyleSheet.create({
  container: {

  },
  content: {
    paddingHorizontal: horizontalScale(METRICS.medium10),
    flexDirection: 'row',
    minHeight: verticalScale(55),
    alignItems: 'center',
    backgroundColor: COLORS.transparent,
    borderRadius: moderateScale(10),
  },

  input: {
    fontSize: FONTS.regular,
    color: COLORS.gray,
    paddingLeft: 0,
    flex: 1,
    fontFamily: FONTS_FAMILY.regular.body,
  },

  errorText: {
    color: COLORS.error,
    fontSize: FONTS.word,
  },

  secondaryView: {
    flex: 0,
  },
  icon: {
    fontSize: FONTS.mediumIcon,
    color: COLORS.gray,
  },
  imageIcon: {
    height: FONTS.mediumIcon,
    width: FONTS.mediumIcon,
  },
});

export default DatePicker;
