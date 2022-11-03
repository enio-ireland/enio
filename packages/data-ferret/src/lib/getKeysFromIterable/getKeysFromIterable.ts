import { DataType } from '../shared/model'
import { registeredIterableClasses, getConfig } from '../shared/consts'
import { isMarker } from '../isMarker/isMarker'

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
  if (!iterableClass) return []
  let keys = iterableClass.getKeys(target)
  if (getConfig().detectCircularReferences) keys = keys.filter(key => !isMarker(key))
  return keys
}
