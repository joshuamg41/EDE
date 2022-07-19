import { cleanNumber, localToNumber } from './NumberUtil';
import { isObject } from "./ObjectUtil";
import { localToString } from './StringUtil';

export const isValidPassword = (password: any): boolean => {
  return (
    localToString(password).length > 8
  );
};

export const isValidUrl = (url: any): boolean => !!new RegExp('^(https?:\\/\\/)?' + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + '((\\d{1,3}\\.){3}\\d{1,3}))' + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + '(\\?[;&a-z\\d%_.~+=-]*)?' + '(\\#[-a-z\\d_]*)?$', 'i').test(url);

export function isValidPhone(phone: any): boolean {
  return (
    !!phone && typeof phone === "string" && cleanNumber(phone).length === 10
  );
}

export function isValidEmail(email: any): boolean {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(email);
}

export const isValidDocument = (ced: any): boolean => {
  ced = localToString(ced)
  let c = ced.replace(/-/g, '');
  let cedula = c.substr(0, c.length - 1);
  let verificador = c.substr(c.length - 1, 1);
  let suma = 0;
  if (ced.length < 11) {
    return false;
  }
  for (let i = 0; i < cedula.length; i++) {
    let mod: any = '';
    if (i % 2 == 0) {
      mod = 1;
    } else {
      mod = 2;
    }
    let res: any = cedula.substr(i, 1) * mod;
    if (res > 9) {
      res = res.toString();
      let uno = res.substr(0, 1);
      let dos = res.substr(1, 1);
      res = eval(uno) + eval(dos);
    }
    suma += eval(res);
  }
  let el_numero = (10 - (suma % 10)) % 10;
  if (el_numero == verificador && cedula.substr(0, 3) != '000') {
    return true;
  } else {
    return false;
  }
};

export const isEmpty = (any: any, key = 'Value', lengthVal = 1): boolean => {
  if (isObject(any)) {
    if (typeof any[key] == 'string') {
      return any[key].length == 0
    } else {
      return !any[key]
    }
  } else if (typeof any == 'string') {
    return any.length < lengthVal
  } else if (typeof any == 'number') {
    return !(any > 0)
  } else if (Array.isArray(any)) {
    return any.length == 0
  } else {
    return !any
  }
}

export const isValidNumber = (value?: any): boolean => {
  return !isEmpty(localToNumber(value))
}