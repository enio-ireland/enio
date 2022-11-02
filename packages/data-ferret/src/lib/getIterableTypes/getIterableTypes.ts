import { DataType } from '../shared/model'
import { registeredIterableClasses } from '../shared/consts'

/**
 * Returns a list of iterable data types. By default 'array' and 'object',
 * but can be extended by calling registerIterableClass().
 */
export const getIterableTypes = <T extends string = DataType>(): T[] =>
  registeredIterableClasses.map(({ classRef }) => {
    // @ts-expect-error TS2571 Using unusual way of referencing classes.
    const name = classRef.name
    if (name === Object.name) return 'object'
    if (name === Array.name) return 'array'
    return name
  })
