import { localToString } from './StringUtil';

describe('StringUtil', () => {
  test('localToArray', () => {
    expect(localToString(null)).toEqual('')
    expect(localToString(undefined)).toEqual('')
    expect(localToString(15)).toEqual('15')
  })
})