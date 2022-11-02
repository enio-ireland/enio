import { DataType } from '../shared/model'
import { registeredIterableClasses } from '../shared/consts'

/**
 * Returns keys of an iterable type data.
 */
export const getKeysFromIterable = <T extends string = DataType>(target: unknown, dataType: T): string[] => {
  if (dataType === 'array') dataType = Array.name as T
  if (dataType === 'object') dataType = Object.name as T
  const iterableClass = registeredIterableClasses.find(({ classRef }) => {
    // @ts-expect-error TS2571 Using unusual way of referencing classes.
    return dataType === (classRef.name as T)
  })
  return iterableClass ? iterableClass.getKeys(target) : []
}
