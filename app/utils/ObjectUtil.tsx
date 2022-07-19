import { IModalListInDto } from "react-native-picker-modal-view/dist/Interfaces";

export const isObject = (o: any) => {
  return (!!o) && (o.constructor === Object);
}

export const localToObject = (o: any) => {
  if (!isObject(o)) {
    return {}
  }
  return o
}

export const safeValExtraction = (o: any, key = 'Value') => {
  return localToObject(o)[key]
}

export const isObjectEmpty = (o: object) => {
  return Object.keys(localToObject(o)).length == 0
}

export const transformErrorArray = (o: any, s?: any): string => {
  if(typeof s == 'string'){
    return s
  }
  const messageArray: string[] = []
  Object.keys(localToObject(o)).map((key) => {
    messageArray.push(o[key])
  })
  return messageArray.join('\n')
}

export const filterObject = (a: IModalListInDto[] | undefined, k: string | number, v: string | number | undefined): IModalListInDto | undefined => {
  if (Array.isArray(a)) {
    const result = a.find((e) => e[k] == v);
    return result;
  } else {
    return undefined;
  }
}