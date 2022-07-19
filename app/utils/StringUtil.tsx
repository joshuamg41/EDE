import React from 'react';
import Text from "../components/text/Text";
import { localToArray } from "./ArrayUtil";
import { localToNumber } from "./NumberUtil";

export const tagToBold = (s?: string) => {
  if (typeof s !== 'string') {
    return ''
  }

  const match1 = new RegExp('<strong>', 'g')
  const match2 = new RegExp('</strong>', 'g')

  const _s = s.replace(match1, '**').replace(match2, '**').split('**')
  const __s: string | Element[] = []
  for (const [index, text] of _s.entries()) {
    if (index % 2) {
      __s.push(<Text theme='bodyBold'>{text}</Text>)
    } else {
      __s.push(text)
    }
  }

  return __s
}

export function capitalizeFirstLetter(s: any): string {
  if (!s) {
    return s
  }
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

export function localToString(s: any, whatReturn = ''): string {
  if (!s) {
    return whatReturn
  }
  return String(s)
}

export function cleanString(s: any): string {
  if (!s) {
    return ""
  }
  return String(s).trim()
}

export function parseToMoneyWCents(number: any, prefix = 'RD$') {
  const _number = localToNumber(number)
  if (!_number) {
    return 'Gratis'
  }
  const val = Math.round(_number * 100) / 100;
  const parts = val.toString().split('.');
  return `${prefix} ${parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${(parts[1] ? `.${parts[1].padEnd(2, '0')}` : '.00')}`;
}

export function isStringEmpty(s: any) {
  if (!s || String(s).length == 0) {
    return false
  }
  return s
}

export function cleanNumberWithDecimal(n: number | string | null | undefined): string {
  if (!n) {
    return ''
  }
  return `${n}`.replace(/[^0-9.]/g, '')
}

export function formatNumber(n: number | string | null | undefined): string {
  if (!n) {
    return ''
  }

  const _n = localToString(n)

  const int = new Array('.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
  let value = "";
  let fvalue = "";
  let count = 0;

  for (let i = 0; i < _n.length; i++) {
    value += int.indexOf(_n.substr(i, 1)) !== -1 ? _n.substr(i, 1) : "";
  }

  fvalue = value;

  for (let i = 0; i < value.length; i++) {
    if (value.substr(i, 1) === "0" || value.substr(i, 1) === ".") {
      fvalue = value.substr(i + 1);
    } else break;
  }

  for (let i = 0; i < fvalue.length; i++) {
    if (fvalue.substr(i, 1) === ".") {
      count++;
      if (count > 1) {
        fvalue = fvalue.substr(0, i);
        break;
      }
    }
  }

  return fvalue
}

export function cleanNumbersFromString(s: string): string {
  if (!s) {
    return ''
  }
  return localToString(s).replace(/[\d-]/g, '')
}

export function containString(v1: string, v2: string, caseSensitive = false) {
  if (!v1 || !v2) {
    return false;
  }

  let s1 = String(v1);
  let s2 = String(v2);
  if (!caseSensitive) {
    s1 = s1.toUpperCase();
    s2 = s2.toUpperCase();
  }
  return s1.indexOf(s2) !== -1;
}

export function searchInString(string = '', query = ''): boolean {
  const _string = localToString(string).toLowerCase().replace(/\s/g, '')
  const _query = localToString(query).toLowerCase().replace(/\s/g, '')

  return _string.includes(_query)
}

export function formatPhoneNumber(s?: string): string {
  if (!s) {
    return localToString(s)
  }

  const _cleanNumber = cleanNumber(s)

  const len = _cleanNumber.length;
  let result = `(${_cleanNumber}`;

  if (len < 3) {
    return result;
  }
  result = `${result.substr(0, 4)}) ${result.substr(4)}`;

  if (len < 6) {
    return result;
  }
  result = `${result.substr(0, 9)}-${result.substr(9)}`;

  return result;
}

export function cleanNumber(s?: string): string {
  return localToString(s).replace(/\D/g, '');
}

export function divideString(string = '', symbol = '/'): string[] {
  const array = localToArray(string.split(symbol))

  return array.map(str => localToString(str).trim())
}

export const invertRule = (rule?: string) => {
  if (!rule) {
    return ''
  }
  const ruleSeparated = localToString(rule).split(':')
  const ruleAction: string[] = localToString(ruleSeparated[0]).split(',')
  const ruleField: string[] = localToString(ruleSeparated[1]).split(',')

  const invertedRule = ruleAction.map(rule => {
    switch (rule) {
      case '0':
        return '1'
      case '1':
        return '0'
      case '2':
        return '3'
      case '3':
        return '2'
      case '4':
        return '6'
      case '6':
        return '4'
      default:
        return '7'
    }
  })
  return `${invertedRule}:${ruleField}`
}

export const defaultString = {
  requiredText: 'Este campo es requerido',
  validEmail: 'Favor digitar un email válido',
  validUrl: 'Favor digitar un URL válido',
  validPhone: 'Favor digitar un teléfono válido',
  validRnc: 'Favor digitar un Rnc válido',
}