import { cleanNumberWithDecimal } from "./StringUtil"

export const addByArray = (arr: string[]) => {
  if (!Array.isArray(arr)) {
    return 0
  }
  let total = 0
  arr.map((item, index) => {
    const _item = localToNumber(cleanNumberWithDecimal(item))
    if (isNaN(_item)) {
      return
    }
    total += _item
  })
  return total
}

export function cleanNumber(s?: string): string {
  return (`${s}`).replace(/\D/g, '');
}

export const localToNumber = (n: any, whatReturn = 0): number => {
  if (!n || String(n).length == 0) {
    return whatReturn
  }
  return Number(n)
}