import deepEqual from "deep-equal";
import { RenderFieldProps } from "../components/form/components/RenderField";
import { FIELD_TYPES } from "../components/form/FormConstants";
import { invertRule, localToString, searchInString } from "./StringUtil";
import { isEmpty } from "./ValidationUtil";

export const localToArray = (array?: any[] | any | null): any[] => {
  if (!Array.isArray(array)) {
    return []
  }
  return array
}

export const emptyOrArray = (array?: any[] | any | null): any[] | undefined => {
  if (!localToArray(array).length) {
    return undefined
  }
  return array
}

interface record {
  [key: string]: any;
}

export const filterArray = (queryParam?: string | null, records?: record[] | null, properties: string[] = ['']): any[] => {
  const query = localToString(queryParam);
  if (!Array.isArray(records)) {
    return []
  } else if (query.length == 0) {
    return records
  }
  const filteredRecords: record[] = [];
  for (const item of records) {
    const shouldPush: boolean[] = [];
    for (const property of properties) {
      shouldPush.push(searchInString(item[property], query))
    }
    if (shouldPush.includes(true)) {
      filteredRecords.push(item)
    }
  }
  return filteredRecords;
};

export const sumValArray = (property: string, records?: record[]): number => {
  if (isEmpty(records)) {
    return 0
  }

  return (
    localToArray(records).reduce(function (prev, cur) {
      return prev + cur?.[property];
    }, 0)
  )
}

const dataToModalPicker = (data: any[]): any[] => {
  return localToArray(data).map(item => {
    return {
      Id: item.value,
      Name: item.label,
      Value: item.value,
      Rule: localToString(item.rule),
      Father: item.father,
      InvertRule: invertRule(item.rule),
    }
  })
}

const dataToPickerSelect = (data: any[]): any[] => {
  return localToArray(data).map(item => {
    return {
      value: item.value,
      label: item.label,
    }
  })
}

const dataToCheckboxGroup = (data: any[]): any[] => {
  return localToArray(data).map(item => {
    return {
      Id: item.value,
      Name: item.label,
      Value: item.value,
    }
  })
}

const transformDataArray = (data: any[], fieldType: string, extraData = []) => {
  switch (fieldType) {
    case FIELD_TYPES.radioGroup:
      return dataToPickerSelect(data)
    case FIELD_TYPES.select:
      return dataToModalPicker(data)
    case FIELD_TYPES.checkboxGroup:
      return dataToCheckboxGroup(data)
    case FIELD_TYPES.rulesPrice:
      return extraData
    default:
      return []
  }
}

const transformValues = (values?: any[]) => {
  if (!Array.isArray(values)) {
    return []
  }
  return values.map(value => {
    return {
      ...value,
      rule: localToString(value?.rule),
      invertRule: invertRule(value?.rule),
    }
  })
}

export const transformField = (field: any): RenderFieldProps => {
  const fields = localToArray(field.fields).map(transformField)
  return {
    ...field,
    key: field.orden,
    fieldKey: field.name,
    father_id: field.father_id || field.MaskParam,
    data: transformDataArray(field.values, field.type, field.data),
    fields,
    values: transformValues(field.values),
    //Mocked
    // hidden: false,
    //Mocked
    // enabled: true,
  }
}

export const mapArrayDiff = (array1: any[], array2: any[], unique = false) => {
  let result = [];
  array1 = localToArray(array1)
  array2 = localToArray(array2)

  for (let i = 0; i < array1.length; i++) {
    let item1 = array1[i],
      found = false;
    for (let j = 0; j < array2.length && !found; j++) {
      found = deepEqual(item1, array2[j]);
    }
    if (found === !!unique) {
      result.push(item1);
    }
  }
  return result
}

export const arrayArrayToArray = (arrayArray?: any[][]): any[] => {
  const array: any[] = []

  if(!arrayArray){
    return []
  }

  for (const row of arrayArray) {
    for (const cell of row) {
      array.push(cell)
    }
  }

  return array
}