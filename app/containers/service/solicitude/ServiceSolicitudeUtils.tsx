import moment from "moment";
import RNFetchBlob from "react-native-blob-util";
import { RenderFieldProps } from "../../../components/form/components/RenderField";
import { FIELD_TYPES } from "../../../components/form/FormConstants";
import { localToArray } from "../../../utils/ArrayUtil";
import { cleanNumber, localToNumber } from "../../../utils/NumberUtil";
import { cleanNumberWithDecimal, localToString } from "../../../utils/StringUtil";
import { isEmpty } from "../../../utils/ValidationUtil";

const transformValue = (val: any, fieldProps?: RenderFieldProps): { value: string, labelValue: string } => {
  let _val = undefined
  let _labelValue = undefined
  const extraData: any = {}

  //Transformation by field type
  switch (fieldProps?.type) {
    case FIELD_TYPES.select:
      _val = val?.Value
      _labelValue = val?.Name
      extraData.customLabel = {
        key: fieldProps.label_persist,
        value: val?.Name
      }
      break;
    case FIELD_TYPES.radioGroup:
      _val = val
      _labelValue = fieldProps.values.find(item => item.value == val)?.label
      break;
    case FIELD_TYPES.checkboxGroup:
      _val = [fieldProps?.label]
      _labelValue = null
      break;
    case FIELD_TYPES.text:
      _val = val
      _labelValue = null
      break;
    case FIELD_TYPES.date:
      _val = moment(_val).format('YYYY-MM-DD')
      _labelValue = fieldProps?.label
      break;
    case FIELD_TYPES.time:
      _val = moment(_val).format('HH:mm')
      _labelValue = fieldProps?.label
      break;
    default:
      _val = val
      _labelValue = fieldProps?.label
      break;
  }

  //Transformation by mask type
  switch (fieldProps?.Mask) {
    case '0':
      _val = cleanNumber(_val)
      break;
    case '1':
      _val = cleanNumber(_val)
      break;
    case '2':
      _val = cleanNumber(_val)
      break;
    case '3':
      _val = cleanNumber(_val)
      break;
    case '6':
      _val = localToNumber(cleanNumberWithDecimal(_val))
      break;
    case '10':
      _val = moment(_val).format('YYYY-MM-DD')
      break;
    case '11':
      _val = moment(_val).format('HH:mm')
      break;
    default:
      break;
  }

  return {
    value: _val,
    labelValue: _labelValue,
    ...extraData,
  }
}

const reverseTransformValue = (val: any, fieldProps?: RenderFieldProps): any => {
  let _val = undefined
  switch (fieldProps?.type) {
    case FIELD_TYPES.select:
      _val = fieldProps.data?.find(item => item.Value == val.value)
      break;
    case FIELD_TYPES.checkboxGroup:
      _val = true
      break;
    case FIELD_TYPES.date:
      //@ts-ignore
      _val = new Date(moment(val.value, 'YYYY-MM-DD'))
      break;
    case FIELD_TYPES.time:
      //@ts-ignore
      _val = new Date(moment(val.value, 'hh:mm'))
      break;
    default:
      _val = localToString(val.value)
      break;
  }

  return _val
}

export const transformFileData = (values: { [key: string]: any }, plainData: RenderFieldProps[]) => {
  const _values: { key: string, value: any }[] = []
  for (const key in values) {
    if (!isEmpty(values[key])) {
      _values.push({
        key,
        value: values[key],
      })
    }
  }

  const newData: {
    newFile: any[];
    oldFile: any[];
  } = {
    newFile: [],
    oldFile: [],
  }

  _values
    .map(val => {
      const fieldProps = plainData.find(item => item.fieldKey === val.key)
      return {
        ...fieldProps,
        ...val,
      }
    })
    .filter(field => field.type == 'file')
    .map((field) => {
      const valueArr = localToArray(field.value)
      valueArr.map((file, index) => {
        if (file?.newFile) {
          newData.newFile.push({
            name: 'file[]',
            filename: file?.fileName || file?.name,
            type: file?.type,
            data: RNFetchBlob.wrap(file?.uri.replace('file://', '')),
          })
        } else {
          newData.oldFile.push({
            ...file,
            label: field?.label,
          })
        }
      })
    })

  return newData
}

export const transformSoftExpertData = (values: { [key: string]: any }, plainData: RenderFieldProps[]) => {
  const _values: { key: string, value: any }[] = []
  for (const key in values) {
    if (!isEmpty(values[key])) {
      _values.push({
        key,
        value: values[key],
      })
    }
  }

  const fieldList: { filename: string, label: string }[] = []
  _values
    .map(val => {
      const fieldProps = plainData.find(item => item.fieldKey === val.key)
      return {
        ...fieldProps,
        ...val,
      }
    })
    .filter(field => field.type == 'file')
    .map((field) => {
      const valueArr = localToArray(field.value)
      valueArr.map((file, index) => {
        const fileNumber = valueArr.length > 1 ? ` ${index + 1}` : ''
        fieldList.push({
          filename: file?.fileName || file?.name,
          label: `${field?.label}${fileNumber}`,
        })
      })
    })

  return fieldList
}

export const reverseTransformFormData = (values: {
  key: string;
  type: string;
  label: string;
  value: string | number;
  labelValue: string;
}[] | undefined, plainData: RenderFieldProps[]): {
  [key: string]: any;
} | undefined => {
  if (!values || !localToArray(values).length) {
    return {}
  }
  const data: { [key: string]: any; } = {}
  for (const value of values) {
    const fieldData = plainData.find(field => field.fieldKey == value?.key)
    data[fieldData?.fieldKey || ''] = reverseTransformValue(value, fieldData)
  }

  return data
}

export const reverseTransformFormGrid = (values: { [key: string]: any }, plainData: RenderFieldProps[]): {
  [key: string]: any;
} | undefined => {
  const data: { [key: string]: any; } = {}
  for (const relationship in values) {
    const valArray = localToArray(values[relationship]);
    if (!valArray.length) {
      continue;
    }
    const gridData = plainData.find(field => field.relationship == relationship)
    data[gridData?.fieldKey || ''] = valArray.map((rowValues) => {
      const rowData: { [key: string]: any; } = {}
      for (const fieldKey in rowValues) {
        const value = rowValues[fieldKey];
        rowData[fieldKey || ''] = reverseTransformValue(value, gridData?.fields.find(field => field.fieldKey == fieldKey))
      }
      return rowData
    })
  }

  return data
}

export const transformFormData = (values: { [key: string]: any }, plainData: RenderFieldProps[], errors: { [key: string]: string } = {}) => {
  let _values: { key: string, value: any }[] = []
  Object.keys(values).map(key => {
    if (!isEmpty(values[key])) {
      _values.push({
        key,
        value: values[key],
      })
    }
  })
  return _values
    .map(val => {
      const fieldProps = plainData.find(item => item.fieldKey === val.key)
      if (fieldProps?.hidden) {
        return false
      }
      return {
        key: val.key,
        ...transformValue(val.value, fieldProps),
        type: fieldProps?.type,
        label: fieldProps?.label,
      }
    })
    .filter(field => field && field.type !== 'file' && field.type !== 'grid' && !errors[field.key])
}

export const transformFormGrid = (values: { [key: string]: any }, plainData: RenderFieldProps[]) => {
  const _values: { key: string, value: any }[] = []
  const gridTransformed: { [key: string]: any } = {}

  for (const key in values) {
    const elementVal = values[key];
    if (!isEmpty(elementVal)) {
      _values.push({
        key: key,
        value: elementVal,
      })
    }
  }


  for (const val of _values) {
    const fieldProps = plainData.find(item => item.fieldKey === val.key)
    if (fieldProps?.type !== 'grid') {
      continue
    } else if (isEmpty(val.value)) {
      continue
    }
    gridTransformed[fieldProps.relationship] = localToArray(val.value)
      .map(rowVal => {
        const _rowFieldValues: { key: string, value: any }[] = []

        for (const rowFieldKey in rowVal) {
          const elementVal = rowVal[rowFieldKey];
          if (!isEmpty(elementVal)) {
            _rowFieldValues.push({
              key: rowFieldKey,
              value: elementVal,
            })
          }
        }

        const gridTransformedVal: {
          [key: string]: {
            key: string;
            value: string;
            type: string;
            labelValue: null | string;
            MainLabel: string;
          }
        } = {}

        for (const rowFieldValue of _rowFieldValues) {
          const rowFieldProps: RenderFieldProps = fieldProps.fields.find(item => item.fieldKey === rowFieldValue.key)

          gridTransformedVal[rowFieldValue.key] = {
            key: rowFieldValue.key,
            ...transformValue(rowFieldValue.value, rowFieldProps),
            type: rowFieldProps?.type,
            MainLabel: rowFieldProps?.label,
          }
        }

        return gridTransformedVal
      })
  }

  return gridTransformed
}