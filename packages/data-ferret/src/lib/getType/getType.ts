import { registeredClasses } from '../shared/consts'
import { DataType } from '../shared/model'

/**
 * Returns the data type.
 * When classes are registered as types, it checks if objects are instances of a known class.
 */
export const getType = (identity: unknown): DataType => {
  if (identity === null) return 'null'
  const it = typeof identity
  if (it === 'object') {
    if (Array.isArray(identity)) return 'array'
    for (let i = 0; i < registeredClasses.length; i += 1) {
      const registeredClass = registeredClasses[i]
      // @ts-expect-error TS2339, TS2371 - Accessing classes dynamically.
      if (identity instanceof registeredClass) return registeredClass.name
    }
  }
  return it
}
