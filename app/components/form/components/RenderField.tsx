import React, {FunctionComponent, useState} from 'react';
import {
  ImageStyle,
  StyleSheet,
  TextStyle,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native';
import {Item} from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, METRICS} from '../../../themes';
import ApplicationStyles from '../../../themes/ApplicationStyles';
import {localToArray} from '../../../utils/ArrayUtil';
import {cleanNumber} from '../../../utils/NumberUtil';
import {safeValExtraction} from '../../../utils/ObjectUtil';
import {
  capitalizeFirstLetter,
  cleanNumbersFromString,
  formatNumber,
  localToString,
} from '../../../utils/StringUtil';
import {horizontalScale, verticalScale} from '../../../utils/StyleHelpers';
import {isEmpty} from '../../../utils/ValidationUtil';
import Attach from '../../attach/Attach';
import Button from '../../button/Button';
import DatePicker from '../../date-picker/DatePicker';
import HorizontalLine from '../../horizontal-line/HorizontalLine';
import InputArea from '../../Input-area/InputArea';
import InputMasked from '../../Input-masked/InputMasked';
import Input from '../../Input/Input';
import ListRender from '../../list-render/ListRender';
import ModalPicker from '../../modal-picker/ModalPicker';
import PickerSelect from '../../picker-select/PickerSelect';
import CheckRender from '../../security/CheckRender';
import Separator from '../../separator/Separator';
import Text from '../../text/Text';
import TextCheck from '../../text/TextCheck';
import {FIELD_TYPES, MASK_LIST, MASK_TYPE} from '../FormConstants';
import ModalForm from './ModalForm';
import deepEqual from 'deep-equal';
import ModalMap from './ModalMap';

const RenderField: FunctionComponent<RenderFieldProps> = props => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [origin, setOrigin] = useState({
    latitude: 18.482618,
    longitude: -69.91238,
  });

  //misc functions
  const LocalOnValueChange = (val: any) => {
    if (deepEqual(val, props.value)) {
      return;
    }
    //call rule change
    switch (props.type) {
      case FIELD_TYPES.select:
        if (val?.Value) {
          props.changeRule(val.Rule);
        } else if (props.value?.InvertRule) {
          props.changeRule(props.value?.InvertRule);
        }
        break;
      case FIELD_TYPES.checkboxGroup:
        if (val) {
          props.changeRule(
            props.values.find(item => item.value == props.name)?.rule,
          );
        } else {
          props.changeRule(
            props.values.find(item => item.value == props.name)?.ruleF,
          );
        }
        break;
      case FIELD_TYPES.radioGroup:
        if (localToString(val).length > 0) {
          props.changeRule(props.values.find(item => item.value == val)?.rule);
        } else {
          props.changeRule(
            props.values.find(item => item.value == props.value)?.invertRule,
          );
        }
        break;
    }

    //change val
    switch (MASK_LIST[props.Mask || '']) {
      case MASK_LIST[7]:
        props.onValueChange(props.fieldKey, cleanNumbersFromString(val));
        break;
      case MASK_LIST[12]:
        props.onValueChange(props.fieldKey, formatNumber(val));
        break;
      default:
        props.onValueChange(props.fieldKey, val);
        break;
    }
  };

  const handleValidationOnBlur = () => {
    switch (props.Mask) {
      case '0':
        props.validateDocument(props.fieldKey, cleanNumber(props.value));
        break;
      case '20':
        props.validateDpp(
          props.fieldKey,
          safeValExtraction(props.fatherValue, 'Name'),
          props.value,
        );
        break;
      case '21':
        props.validateMimarena(props.fieldKey, props.value);
        break;
      default:
        break;
    }

    props.setFieldTouched(props.fieldKey, true, true);
  };

  const insertFormData = ({
    values,
    fatherKey,
    listIndex,
  }: {
    values: any;
    fatherKey: string;
    listIndex: any;
  }) => {
    const value = localToArray(props.value);
    if (listIndex !== undefined) {
      value[listIndex] = values;
      props.onValueChange(fatherKey, [...value]);
    } else {
      props.onValueChange(fatherKey, [...value, values]);
    }
    setModalVisible(false);
  };

  const deleteGridElement = (position?: number) => {
    if (position != null && position !== undefined) {
      const result: object[] = localToArray(props.value).filter(
        (doc, index) => index !== position,
      );
      props.onValueChange(props.fieldKey, result);
    }
  };

  const childrenDataFilter = (
    arr?: any[],
    fatherKey?: string | null,
    fatherVal?: any,
  ) => {
    if (localToArray(arr).length === 0 || !fatherKey) {
      return arr;
    }

    return localToArray(arr).filter(item => item.Father == fatherVal);
  };

  //render
  const RenderGridItem = ({item, index}: {item: any; index: number}) => {
    return (
      <View style={Styles.gridItemContainer}>
        <TouchableHighlight
          onPress={() => setModalVisible({...item, listIndex: index})}
          underlayColor={COLORS.lightGray}
          style={Styles.gridItemTextSection}>
          <Text>
            {capitalizeFirstLetter(props.label)} {index + 1}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => deleteGridElement(index)}
          underlayColor={COLORS.lightGray}
          style={Styles.gridItemIconSection}>
          <Ionicons
            name="trash-outline"
            size={FONTS.mediumIcon}
            color={COLORS.red}
          />
        </TouchableHighlight>
      </View>
    );
  };

  if (props.hidden) {
    return null;
  }

  switch (props.type) {
    case FIELD_TYPES.header:
      return (
        <View style={ApplicationStyles.hPLarge}>
          {/* @ts-ignore */}
          <Text style={Styles.title(props.subtype)} theme="titleMedium">
            {props.label}
          </Text>
          <Separator
            height={props.subtype == 'h1' ? METRICS.large15 : METRICS.medium10}
          />
        </View>
      );
    case FIELD_TYPES.date:
      return (
        <DatePicker
          mode="date"
          value={props.value}
          onValueChange={LocalOnValueChange}
          placeholder={props.label}
          showError={props.error}
          disabled={!props.enabled}
        />
      );
    case FIELD_TYPES.time:
      return (
        <DatePicker
          mode="time"
          value={props.value}
          onValueChange={LocalOnValueChange}
          placeholder={props.label}
          labelFormat="hh:mm a"
          showError={props.error}
          disabled={!props.enabled}
        />
      );
    case FIELD_TYPES.radioGroup:
      return (
        <PickerSelect
          value={props.value}
          onValueChange={LocalOnValueChange}
          data={props.data}
          showError={props.error}
          placeholder={props.label}
          disabled={!props.enabled}
          onPickerBlur={handleValidationOnBlur}
        />
      );
    case FIELD_TYPES.select:
      return (
        <ModalPicker
          value={props.value}
          onValueChange={LocalOnValueChange}
          onPickerBlur={handleValidationOnBlur}
          // data={documentTypeData}
          data={childrenDataFilter(
            props.data,
            props.father_id,
            safeValExtraction(props.fatherValue),
          )}
          showError={props.error}
          placeholder={props.label}
          disabled={!props.enabled}
        />
      );
    case FIELD_TYPES.checkboxGroup:
      return (
        <TextCheck
          value={props.value}
          onValueChange={LocalOnValueChange}
          disabled={!props.enabled}
          // placeholder={props.label}
          //   showError={props.error}
          //   onPickerBlur={handleValidationOnBlur}
        >
          {props.label}
        </TextCheck>
      );
    case FIELD_TYPES.file:
      return (
        <Attach
          value={props.value}
          onValueChange={LocalOnValueChange}
          title={props.label}
          buttonTitle="Adjuntar"
          buttonTheme="primaryOutline"
          bottomSeparate={false}
          options={['camera', 'library', 'document', 'myDocument']}
          showButton={
            props.multipleDocument ? true : !localToArray(props.value).length
          }
          showError={props.error}
          validExt={props.valid_exts}
          showTitle
        />
      );
    case FIELD_TYPES.text:
      if (['0', '1', '2', '3', '6'].includes(localToString(props.Mask))) {
        return (
          <InputMasked
            mask={localToString(MASK_TYPE[props.Mask || ''])}
            value={props.value}
            onValueChange={LocalOnValueChange}
            placeholder={props.label}
            maxLength={props.length || 144}
            showError={props.error}
            onInputBlur={handleValidationOnBlur}
            editable={props.enabled}
            numberOfLines={1}
            isLoading={
              props.documentLoading &&
              props.documentLoading.fieldKey == props.fieldKey
            }
          />
        );
      }
      if (props.Mask === '8') {
        return (
          <ModalMap
            onValueChange={props.onValueChange}
            setOrigin={props.value}
            origin={origin}
          />
        );
      }
      if (props.fieldKey === 'latitud') {
        return (
          <Input
            onValueChange={LocalOnValueChange}
            placeholder={props.value?.toString()}
            maxLength={props.length || 144}
            showError={props.error}
            onInputBlur={handleValidationOnBlur}
            editable={false}
            numberOfLines={1}
            isLoading={
              (props.mimarenaLoading &&
                props.mimarenaLoading.fieldKey == props.fieldKey) ||
              (props.dppLoading && props.dppLoading.fieldKey == props.fieldKey)
            }
            loadingType="withString"
          />
        );
      }
      if (props.fieldKey === 'longitud') {
        return (
          <Input
            onValueChange={LocalOnValueChange}
            placeholder={props.value?.toString()}
            maxLength={props.length || 144}
            showError={props.error}
            onInputBlur={handleValidationOnBlur}
            editable={false}
            numberOfLines={1}
            isLoading={
              (props.mimarenaLoading &&
                props.mimarenaLoading.fieldKey == props.fieldKey) ||
              (props.dppLoading && props.dppLoading.fieldKey == props.fieldKey)
            }
            loadingType="withString"
          />
        );
      }
      return (
        <Input
          value={props.value}
          onValueChange={LocalOnValueChange}
          placeholder={props.label}
          maxLength={props.length || 144}
          showError={props.error}
          onInputBlur={handleValidationOnBlur}
          editable={props.enabled}
          numberOfLines={1}
          isLoading={
            (props.mimarenaLoading &&
              props.mimarenaLoading.fieldKey == props.fieldKey) ||
            (props.dppLoading && props.dppLoading.fieldKey == props.fieldKey)
          }
          loadingType="withString"
        />
      );
    case FIELD_TYPES.textArea:
      return (
        <InputArea
          value={props.value}
          onValueChange={LocalOnValueChange}
          placeholder={props.label}
          maxLength={props.length || 4000}
          showError={props.error}
          onInputBlur={handleValidationOnBlur}
          editable={props.enabled}
        />
      );
    case FIELD_TYPES.grid:
      return (
        <View>
          <View style={ApplicationStyles.hPLarge}>
            <Text style={Styles.title} theme="titleMedium">
              {props.label}
            </Text>
            <Separator />
            <CheckRender allowed={!isEmpty(props.value)}>
              <ListRender
                data={localToArray(props.value)}
                renderItem={RenderGridItem}
                ItemSeparatorComponent={<HorizontalLine marginHorizontal={0} />}
                renderSeparator={true}
              />
              <Separator />
            </CheckRender>
          </View>
          <Button
            title="Agregar"
            onPress={() => setModalVisible(true)}
            bottomSeparate={false}
          />
          <CheckRender allowed={props.error}>
            <Separator height={METRICS.small5} />
            <Text style={[Styles.errorText]}>
              {typeof props.error == 'string' ? props.error : 'Campo requerido'}
            </Text>
          </CheckRender>
          <Separator />
          <ModalForm
            isVisible={modalVisible}
            onVisibleChange={setModalVisible}
            fields={props.fields}
            doRequest={insertFormData}
            fatherKey={localToString(props.fieldKey)}
            changeRule={props.changeRule}
          />
        </View>
      );
    default:
      return null;
  }
};

export interface RenderFieldProps {
  //my attributes
  key: string;
  fieldKey: string;
  step: number;
  steps: number;
  value?: any;
  onValueChange: (field: string, val: any) => void;
  changeRule: (rule?: string) => void;
  setFieldTouched: (
    field: string,
    touched?: boolean,
    shouldValidate?: boolean | undefined,
  ) => void;
  validateDocument: (fieldKey: string, value: string) => void;
  validateMimarena: (fieldKey: string, value: string) => void;
  validateDpp: (fieldKey: string, type: string, value: string) => void;
  data?: any[];
  error?: string | boolean;
  index?: number;
  items: Item[];
  documentLoading:
    | false
    | {
        citizen_id?: string;
        fieldKey?: string;
      };
  mimarenaLoading:
    | false
    | {
        invoiceNumber?: string;
        fieldKey?: string;
      };
  dppLoading:
    | false
    | {
        code?: string;
        type?: string;
        fieldKey?: string;
      };
  multipleDocument: boolean;

  //service attributes
  type: string;
  length: number | null;
  subtype?: string;
  Mask: string | null;
  father_id: string | null;
  entity: string;
  group: string;
  label_persist: string;
  hidden: boolean;
  required: boolean;
  enabled: boolean;
  label: string;
  orden: string;
  name: string;
  relationship: string;
  values: {
    label: string;
    value: string;
    rule: string;
    ruleF: string;
    father?: null | string;
    invertRule: string;
  }[];
  data_portal: string;
  select_portal_type: string;
  fields: any[];
  rules: {
    name: string;
    value: any;
    type: string;
  }[][];
  valid_exts: null | undefined | 'pdf' | 'png' | 'jpeg' | 'kmz';

  //fatherProps
  fatherValue: any;
}

RenderField.defaultProps = {};

const Styles = StyleSheet.create({
  //@ts-ignore
  title: (subtype: string): ViewStyle | TextStyle | ImageStyle => ({
    fontSize: subtype == 'h1' ? FONTS.large : FONTS.regular,
  }),

  //renderGridItem
  gridItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gridItemTextSection: {
    paddingVertical: verticalScale(METRICS.medium10),
    marginRight: horizontalScale(METRICS.small5),
    flex: 1,
  },
  gridItemIconSection: {
    flex: 0,
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONTS.word,
    paddingHorizontal: horizontalScale(METRICS.large15),
  },
});

export default RenderField;
