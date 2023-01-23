import { DataType } from '../shared/model'
import { registeredIterableClasses } from '../shared/consts'

/**
 * Returns keys of an iterable type data.
 */
export const getKeysFromIterable = <T extends string = DataType>(target: unknown, dataType: T): string[] => {
  if (dataType === 'array') dataType = Array.name as T
  if (dataType === 'object') dataType = Object.name as T
  const iterableClass = registeredIterableClasses.find(({ classRef }) => dataType === (classRef.name as T))
  if (!iterableClass) return []
  return iterableClass.getKeys(target)
}
