import { DataType } from '../shared/model'
import { registeredIterableClasses } from '../shared/consts'

/**
 * Returns a list of iterable data types. By default 'array' and 'object',
 * but can be extended by calling registerIterableClass().
 */
export const getIterableTypes = <T extends string = DataType>(): T[] =>
  registeredIterableClasses.map(({ classRef }) => {
    const name = classRef.name
    if (name === Object.name) return 'object' as T
    if (name === Array.name) return 'array' as T
    return name as T
  })
