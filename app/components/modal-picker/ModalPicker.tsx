import {FormikErrors} from 'formik';
import React, {FunctionComponent, useState} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import PickerModal from 'react-native-picker-modal-view';
import {IModalListInDto} from 'react-native-picker-modal-view/dist/Interfaces';
import {FONTS} from '../../themes';
import COLORS from '../../themes/Colors';
import METRICS from '../../themes/Metrics';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/StyleHelpers';
import {isEmpty} from '../../utils/ValidationUtil';
import {IconPropTypes} from '../icon/Icon';
import CheckRender from '../security/CheckRender';
import Separator from '../separator/Separator';
import Text from '../text/Text';
import {PickerButton} from './PickerButton';

const ModalPicker: FunctionComponent<ModalPickerProps> = props => {
  const [localError, setLocalError] = useState<boolean>(false);

  //Misc
  const onValueChange = (selected: IModalListInDto) => {
    if (props.simpleError) {
      setLocalError(isEmpty(selected));
    }
    props.onValueChange(selected);
    return selected;
  };

  const onEndReached = () => {};

  const onClosed = () => {
    if (typeof props.onPickerBlur == 'function') {
      props.onPickerBlur();
    }
  };

  const onBackButtonPressed = () => {
    if (props.simpleError) {
      setLocalError(isEmpty(props.value));
    } else if (typeof props.complexError == 'function') {
      setLocalError(!props.complexError(props.value));
    }
    if (typeof props.onPickerBlur == 'function') {
      props.onPickerBlur();
    }
  };

  const shouldShowError = props.showError || localError;
  const errorStyle: StyleProp<ViewStyle> = {
    borderColor: (shouldShowError && COLORS.error) || COLORS.lightGray,
    borderWidth: moderateScale(1),
  };

  //Rendering
  const LocalPickerButton = (
    disabled: boolean,
    selected: IModalListInDto,
    showModal: () => void,
  ) => {
    return <PickerButton {...props} onPress={showModal} disabled={disabled} />;
  };

  return (
    <>
      <View
        style={[
          props.containerStyle,
          {marginHorizontal: props.widthSeparator},
        ]}>
        <CheckRender allowed={!isEmpty(props.label)}>
          <Text>{props.label}</Text>
          <Separator height={METRICS.medium10} />
        </CheckRender>
        <View style={[Styles.container, errorStyle]}>
          <PickerModal
            {...props}
            onEndReached={onEndReached}
            onClosed={onClosed}
            onBackButtonPressed={onBackButtonPressed}
            renderSelectView={LocalPickerButton}
            onSelected={onValueChange}
            items={props.data}
            selected={props.value}
            searchInputTextColor={COLORS.black}
          />
        </View>
        <CheckRender allowed={!props.isLoading && shouldShowError}>
          <Separator height={METRICS.medium10} />
          <Text style={[Styles.errorText]}>
            {typeof props.showError == 'string'
              ? props.showError
              : props.errorText}
          </Text>
        </CheckRender>
      </View>
      <CheckRender allowed={props.bottomSeparate}>
        <Separator />
      </CheckRender>
    </>
  );
};

interface ModalPickerProps extends IconPropTypes {
  value?: IModalListInDto;
  onValueChange: (value?: IModalListInDto) => void;
  data?: IModalListInDto[];
  showError?:
    | boolean
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[];
  placeholder?: string;
  disabled?: boolean;
  searchPlaceholderText?: string;
  bottomSeparate?: boolean;
  simpleError?: boolean;
  complexError?: (value?: IModalListInDto) => boolean;
  isLoading?: boolean;
  widthSeparator?: number;
  iconName?: string;
  errorText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  onPickerBlur?: () => void;
  label?: string;
}

ModalPicker.defaultProps = {
  value: undefined,
  onValueChange: undefined,
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
  errorText: 'Campo llenado de forma incorrecta',
};

const Styles = StyleSheet.create({
  container: {
    minHeight: verticalScale(55),
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.transparent,
    borderRadius: moderateScale(10),
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONTS.word,
  },
});

export default ModalPicker;
