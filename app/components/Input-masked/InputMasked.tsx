import React, { FunctionComponent, useRef, useState } from 'react';
import { ImageSourcePropType, ImageStyle, NativeSyntheticEvent, StyleProp, StyleSheet, TextInput, TextInputFocusEventData, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import { FONTS, FONTS_FAMILY } from '../../themes';
import COLORS from '../../themes/Colors';
import METRICS from '../../themes/Metrics';
import { localToString } from '../../utils/StringUtil';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/StyleHelpers';
import { isEmpty } from '../../utils/ValidationUtil';
import Icon from '../icon/Icon';
import Loading from '../loading/Loading';
import CheckRender from '../security/CheckRender';
import Separator from '../separator/Separator';
import Text from '../text/Text';

const InputMasked: FunctionComponent<InputMaskedProps> = props => {
  const [localError, setLocalError] = useState<boolean>(false)
  const inputRef = useRef<TextInput>()

  interface maskTypesProps {
    [key: string]: string
  }

  const maskTypes: maskTypesProps = {
    phone: "([000]) [000] [0000]",
    identification: "[000]-[0000000]-[0]",
    passport: "[000000000]",
    card: "[0000] [0000] [0000] [0000]",
    rnc: "[0]-[00]-[00000]-[0]",
    expiration: "[00]/[00]",
    pin: "[0000]",
    'solo numero': "[000000000000000000000000000]",
  }

  //Misc
  const onBlur = (e?: NativeSyntheticEvent<TextInputFocusEventData>) => {
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
  }

  const focusField = () => {
    inputRef.current?.focus()
  }

  const shouldShowError = props.showError || localError
  const errorStyle: StyleProp<ViewStyle> = {
    borderColor: (shouldShowError && COLORS.error) || COLORS.lightGray,
    borderWidth: moderateScale(1),
    alignItems: 'center',
    justifyContent: 'center',
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
        props.containerStyle,
        { marginHorizontal: props.widthSeparator },
      ]}>
        <View style={[
          Styles.container,
          errorStyle,
        ]}>
          <CheckRender allowed={props.isLoading}>
            <Loading size='small' isLoading={true} color={COLORS.primary} />
            <Text>Validando...</Text>
          </CheckRender>
          <CheckRender allowed={!props.isLoading}>
            <Icon
              {...props}
              inputRef={inputRef.current}
            />
            <TextInputMask
              {...props}
              onChangeText={onValueChange}
              placeholderTextColor={COLORS.grayPlaceholder}
              ref={localRef}
              style={[Styles.input, props.inputStyle]}
              keyboardType='number-pad'
              onBlur={onBlur}
              hitSlop={hitSlop}
              returnKeyType={props.returnKeyType || 'next'}
              mask={maskTypes[localToString(props.mask)]}
            />
            <CheckRender allowed={props.label}>
              <Text onPress={focusField} style={Styles.label}>{props.label}</Text>
            </CheckRender>
            <CheckRender allowed={props.rightSection}>
              {props.rightSection}
            </CheckRender>
          </CheckRender>
        </View>
        <CheckRender allowed={!props.isLoading && shouldShowError}>
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

interface InputMaskedProps extends Omit<TextInputProps, 'onChangeText' | 'onBlur'> {
  bottomSeparate?: boolean;
  isLoading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  setRef?: any;
  onValueChange: (text: string) => void;
  showError?: boolean | string;
  simpleError?: boolean;
  complexError?: (value?: string) => boolean;
  onInputBlur?: (e?: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  widthSeparator?: number;
  label?: string;
  errorText?: string;
  mask?: "phone" | "identification" | "passport" | "card" | "rnc" | "expiration" | "pin" | "ghin" | string,
  iconName?: string;
  image?: ImageSourcePropType;
  rightSection?: JSX.Element | JSX.Element[] | undefined;
}

InputMasked.defaultProps = {
  maxLength: 27,
  bottomSeparate: true,
  isLoading: false,
  showError: false,
  simpleError: false,
  complexError: undefined,
  errorText: "Campo llenado de forma incorrecta",
  widthSeparator: horizontalScale(METRICS.large15),
}

const Styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(METRICS.medium10),
    backgroundColor: COLORS.transparent,
    flexDirection: 'row',
    minHeight: verticalScale(55),
    alignItems: 'center',
    borderRadius: moderateScale(10),
  },

  input: {
    fontSize: FONTS.regular,
    color: COLORS.gray,
    paddingLeft: 0,
    flex: 1,
    fontFamily: FONTS_FAMILY.regular.body,
  },

  label: {
    color: COLORS.tertiary,
    fontSize: FONTS.word,
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONTS.word,
    marginTop: verticalScale(METRICS.medium10),
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

export default InputMasked;