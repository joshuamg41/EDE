import { FormikErrors } from 'formik';
import React, { FunctionComponent, useRef, useState } from 'react';
import { ImageSourcePropType, ImageStyle, NativeSyntheticEvent, StyleProp, StyleSheet, TextInput, TextInputFocusEventData, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';
import { FONTS, FONTS_FAMILY } from '../../themes';
import COLORS from '../../themes/Colors';
import METRICS from '../../themes/Metrics';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/StyleHelpers';
import { isEmpty } from '../../utils/ValidationUtil';
import Icon from '../icon/Icon';
import Loading from '../loading/Loading';
import CheckRender from '../security/CheckRender';
import Separator from '../separator/Separator';
import Text from '../text/Text';

const Input: FunctionComponent<InputProps> = props => {
  const [localError, setLocalError] = useState<boolean>(false)
  const inputRef = useRef<TextInput>()

  //Misc
  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (props.simpleError) {
      setLocalError(isEmpty(props.value))
    }
    if (typeof props.onInputBlur == 'function') {
      props.onInputBlur(e)
    }
  }

  const onValueChange = (value: string) => {
    props.onValueChange(value)
  }

  const localRef = (ref: TextInput) => {
    inputRef.current = ref
    if (typeof props.setRef == 'function') {
      props.setRef(ref)
    }
    if (ref) {
      ref.setNativeProps({
        style: { fontFamily: FONTS_FAMILY.regular.body }
      })
    }
  }

  const focusField = () => {
    inputRef.current?.focus()
  }

  const shouldShowError = props.showError || localError
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

  const hitSlop = { top: 20, right: 10, bottom: 20, left: 10 }

  //Rendering
  return (
    <>
      <View style={[
        Styles.container,
        props.containerStyle,
        { marginHorizontal: props.widthSeparator },
      ]}>
        <CheckRender allowed={!isEmpty(props.label)}>
          <Text>{props.label}</Text>
          <Separator height={METRICS.medium10} />
        </CheckRender>
        <View style={[
          Styles.inputContent,
          props.inputContentStyle,
          errorStyle,
        ]}>
          <Loading
            size='small'
            isLoading={props.loadingType == 'default' && props.isLoading}
          />
          <CheckRender allowed={props.loadingType == 'withString' && props.isLoading}>
            <Loading size='small' isLoading={true} color={COLORS.primary} />
            <Text>Validando...</Text>
          </CheckRender>
          <CheckRender allowed={!props.isLoading}>
            <Icon
              {...props}
              inputRef={inputRef.current}
            />
            <TextInput
              {...props}
              onChangeText={onValueChange}
              placeholderTextColor={COLORS.grayPlaceholder}
              ref={localRef}
              style={[Styles.input, props.inputStyle]}
              onBlur={onBlur}
              hitSlop={hitSlop}
            />
            <CheckRender allowed={props.rightSection}>
              {props.rightSection}
            </CheckRender>
          </CheckRender>
        </View>
        <CheckRender allowed={!props.isLoading && shouldShowError}>
          <Separator height={METRICS.medium10} />
          <Text style={[Styles.errorText]}>
            {typeof props.showError == 'string' ? props.showError : props.errorText}
          </Text>
        </CheckRender>
      </View>
      <CheckRender allowed={props.bottomSeparate}>
        <Separator />
      </CheckRender>
    </>
  );
}

export interface InputProps extends Omit<TextInputProps, 'onChangeText' | 'onBlur'> {
  bottomSeparate?: boolean;
  isLoading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputContentStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  setRef?: any;
  onValueChange: (text: string) => void;
  showError?: boolean | string | string[] | FormikErrors<any> | FormikErrors<any>[];
  simpleError?: boolean;
  complexError?: (value?: string) => boolean;
  onInputBlur?: (e?: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  fieldIsValid?: (value?: boolean) => void;
  widthSeparator?: number;
  label?: string;
  errorText?: string;
  iconName?: string;
  image?: ImageSourcePropType;
  rightSection?: JSX.Element | JSX.Element[] | undefined;
  loadingType?: 'default' | 'withString'
}

Input.defaultProps = {
  maxLength: 27,
  bottomSeparate: true,
  isLoading: false,
  showError: false,
  simpleError: false,
  complexError: undefined,
  errorText: "Campo llenado de forma incorrecta",
  widthSeparator: horizontalScale(METRICS.large15),
  loadingType: 'default',
}

const Styles = StyleSheet.create({
  container: {

  },

  inputContent: {
    paddingHorizontal: horizontalScale(METRICS.medium10),
    flexDirection: 'row',
    minHeight: verticalScale(55),
    alignItems: 'center',
    backgroundColor: COLORS.transparent,
    justifyContent: 'center',
    borderRadius: moderateScale(10),
  },

  input: {
    fontSize: FONTS.regular,
    color: COLORS.gray,
    paddingLeft: 0,
    fontFamily: FONTS_FAMILY.regular.body,
    flex: 1,
  },

  label: {
    color: COLORS.tertiary,
    fontSize: FONTS.word,
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

export default Input;