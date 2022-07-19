import { filterArray, localToArray } from './ArrayUtil';

describe('ArrayUtil', () => {
  test('localToArray', () => {
    expect(localToArray(null)).toEqual([])
    expect(localToArray(undefined)).toEqual([])
    expect(localToArray(15)).toEqual([])
    expect(localToArray([1, 2])).toEqual([1, 2])
    expect(localToArray(['Alice', 'Bob', 'Eve'])).toHaveLength(3)
  })

  test('filterArray', () => {
    const array = [
      { name: 'Alice', lastName: 'Ortiz' },
      { name: 'Bob', lastName: 'Ortiz' },
      { name: 'Eve', lastName: 'Velazquez' },
    ]

    //It should return the same array in case of no query
    expect(filterArray(null, array, ['name'])).toEqual(array)
    //Filtering by lastName
    expect(filterArray(array[0].lastName, array, ['lastName'])).toEqual([
      { name: 'Alice', lastName: 'Ortiz' },
      { name: 'Bob', lastName: 'Ortiz' }
    ])
    //Filtering by name
    expect(filterArray(array[0].name, array, ['name'])).toEqual([
      { name: 'Alice', lastName: 'Ortiz' },
    ])
    //No array input
    expect(filterArray(array[0].name, undefined, ['name'])).toEqual([])

    //undefined property
    expect(filterArray(array[0].name, undefined, undefined)).toEqual([])
  })
})