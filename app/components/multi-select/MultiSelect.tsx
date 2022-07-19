import React, { FunctionComponent, useRef, useState } from "react";
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import RNMultiSelect, { MultiSelectProps } from 'react-native-multiple-select';
import { FONTS, FONTS_FAMILY } from "../../themes";
import COLORS from '../../themes/Colors';
import METRICS from '../../themes/Metrics';
import { localToArray } from "../../utils/ArrayUtil";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/StyleHelpers";
import { isEmpty } from '../../utils/ValidationUtil';
import CheckRender from "../security/CheckRender";
import Separator from "../separator/Separator";
import Text from "../text/Text";

const MultiSelect: FunctionComponent<propTypes> = props => {
  const multiSelectRef = useRef<RNMultiSelect>(null)
  const [localError, setLocalError] = useState<boolean>(false)

  //Misc
  const onValueChange = (selected: any) => {
    if (props.simpleError) {
      setLocalError(isEmpty(selected))
    }
    
    if (!props.disabled) {
      props.onValueChange(selected)
    }
    return selected
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
        <RNMultiSelect
          ref={multiSelectRef}
          uniqueKey="Id"
          displayKey="Name"
          onSelectedItemsChange={onValueChange}
          selectText={props.placeholder}
          searchInputPlaceholderText={props.searchPlaceholderText}
          selectedItems={props.value}
          items={localToArray(props.data)}
          submitButtonText='Aceptar'
          altFontFamily={FONTS_FAMILY.regular.body}
          fontSize={FONTS.regular}
          tagRemoveIconColor={COLORS.error}
          tagBorderColor={COLORS.tertiary}
          tagTextColor={COLORS.tertiary}
          //@ts-ignore
          tagContainerStyle={Styles.tagContainer}
          styleMainWrapper={[errorStyle, Styles.container]}
          styleDropdownMenu={[Styles.dropdownMenuSubsection]}
        />
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

interface propTypes extends Omit<MultiSelectProps, 'items' | 'onSelectedItemsChange'> {
  data?: any[];
  value?: any;
  onValueChange: (value?: any) => void;
  showError?: boolean | string;
  placeholder?: string;
  disabled?: boolean;
  searchPlaceholderText?: string;
  bottomSeparate?: boolean;
  simpleError?: boolean;
  complexError?: (value?: any) => boolean;
  isLoading?: boolean;
  widthSeparator?: number;
  iconName?: string;
  errorText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  onPickerBlur?: () => void;
}

MultiSelect.defaultProps = {
  value: undefined,
  onValueChange: undefined,
  disabled: false,
  data: [],
  showError: false,
  placeholder: 'Seleccione una opción',
  searchPlaceholderText: 'Buscar',
  selectedItemFontFamily: FONTS_FAMILY.regular.body,
  bottomSeparate: true,
  simpleError: false,
  complexError: undefined,
  isLoading: false,
  widthSeparator: horizontalScale(METRICS.large15),
  errorText: "Campo llenado de forma incorrecta",
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.transparent,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    minHeight: verticalScale(55),
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONTS.word,
  },
  tagContainer: {
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(METRICS.medium10),
    height: moderateScale(40),
  },
  dropdownMenuSubsection: {
    paddingHorizontal: horizontalScale(10),
  },
});

export default MultiSelect;