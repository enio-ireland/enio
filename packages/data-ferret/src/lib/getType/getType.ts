import { DataType } from '../shared/model'
import { registeredClasses } from '../shared/consts'

/**
 * Returns the data type of target.
 * Uses native typeof, however makes separate distinction for 'null' and 'array' values.
 * Additionally, when classes are registered as types, it checks if objects are instances of a known class.
 */
export const getType = <T extends string = DataType>(target: unknown): T => {
  if (target === null) return 'null' as T
  const nativeDataType = typeof target
  if (nativeDataType === 'object') {
    if (Array.isArray(target)) return 'array' as T
    for (let i = 0; i < registeredClasses.length; i += 1) {
      const registeredClass = registeredClasses[i]
      // @ts-expect-error TS2339, TS2371 - Accessing classes dynamically.
      if (target instanceof registeredClass) return registeredClass.name
    }
  }
  return nativeDataType as T
}
