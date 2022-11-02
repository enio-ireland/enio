import { DataType } from '../shared/model'
import { getIterableTypes } from '../getIterableTypes/getIterableTypes'

/**
 * Returns true when data type is iterable. By default 'array' and 'object' are iterable,
 * but can be extended by calling registerIterableClass().
 */
export const isIterableType = <T extends string = DataType>(dataType: T): boolean => getIterableTypes<T>().includes(dataType)
