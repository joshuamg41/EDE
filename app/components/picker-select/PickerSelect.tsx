import React, { FunctionComponent, useRef, useState } from "react";
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import RNPickerSelect, { Item, PickerSelectProps } from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FONTS } from "../../themes";
import COLORS from '../../themes/Colors';
import METRICS from '../../themes/Metrics';
import { localToArray } from "../../utils/ArrayUtil";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/StyleHelpers";
import { isEmpty } from '../../utils/ValidationUtil';
import Icon from "../icon/Icon";
import CheckRender from "../security/CheckRender";
import Separator from "../separator/Separator";
import Text from "../text/Text";

const PickerSelect: FunctionComponent<propTypes> = props => {
  const pickerSelectRef = useRef<RNPickerSelect>(null)
  const [localError, setLocalError] = useState<boolean>(false)

  //Misc
  const onValueChange = (selected: Item) => {
    if (props.simpleError) {
      setLocalError(isEmpty(selected))
    }
    props.onValueChange(selected)
    return selected
  }

  const getLabel = () => {
    if (!props.value || !Array.isArray(props.data)) {
      return props.placeholder
    }
    const _value = props.data?.find(item => item.value == props.value)

    return _value?.label
  }

  const onClosed = () => {
    if (typeof props.onPickerBlur == 'function') {
      props.onPickerBlur()
    }
  }

  //Variable Styles
  const shouldShowError = props.showError || localError
  const errorStyle: StyleProp<ViewStyle> = {
    borderColor: (shouldShowError && COLORS.error) || COLORS.lightGray,
    borderWidth: moderateScale(1),
  }
  const textColorStyle: StyleProp<TextStyle> = {
    color: props.value !== undefined ? COLORS.gray : COLORS.grayPlaceholder,
  }

  //Rendering
  return (
    <>
      <View style={[
        props.containerStyle,
        { marginHorizontal: props.widthSeparator },
      ]}>
        <View
          style={[
            Styles.container,
            errorStyle,
          ]}
        >
          <RNPickerSelect
            ref={pickerSelectRef}
            disabled={props.disabled}
            onValueChange={onValueChange}
            placeholder={{ value: undefined, label: props.placeholder }}
            onClose={onClosed}
            onDonePress={onClosed}
            value={props.value}
            style={{
              inputAndroidContainer: Styles.input,
              inputIOSContainer: Styles.input,
            }}
            items={localToArray(props.data)}
            useNativeAndroidPickerStyle={false}
            textInputProps={{
              numberOfLines: 1,
            }}
            Icon={() =>
              <Ionicons
                name="caret-down"
                style={[Styles.icon, textColorStyle]}
              />
            }
          >
            <View style={Styles.viewContainer}>
              <Icon
                {...props}
              />
              <Text style={[textColorStyle]}>{getLabel()}</Text>
            </View>
          </RNPickerSelect>
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
  )
}

interface propTypes extends Omit<PickerSelectProps, 'items'> {
  value?: string;
  data?: any[];
  onValueChange: (value?: Item) => void;
  showError?: boolean | string;
  placeholder?: string;
  disabled?: boolean;
  searchPlaceholderText?: string;
  bottomSeparate?: boolean;
  simpleError?: boolean;
  complexError?: (value?: Item) => boolean;
  isLoading?: boolean;
  widthSeparator?: number;
  iconName?: string;
  errorText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  onPickerBlur?: () => void;
}

PickerSelect.defaultProps = {
  value: undefined,
  disabled: false,
  data: [],
  showError: false,
  placeholder: 'Seleccione una opción',
  searchPlaceholderText: 'Buscar',
  bottomSeparate: true,
  simpleError: false,
  complexError: undefined,
  isLoading: false,
  widthSeparator: horizontalScale(METRICS.large15),
  errorText: "Campo llenado de forma incorrecta",
};

const Styles = StyleSheet.create({
  container: {
    minHeight: verticalScale(55),
    backgroundColor: COLORS.transparent,
    borderRadius: moderateScale(10),
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONTS.word,
  },
  icon: {
    fontSize: FONTS.smallIcon,
    color: COLORS.gray,
  },
  viewContainer: {
    flexDirection: 'row',
    paddingLeft: horizontalScale(METRICS.medium10),
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: verticalScale(55),
    justifyContent: 'center',
  },
});

export default PickerSelect;