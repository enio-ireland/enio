import { DataType } from '../shared/model'
import { getType } from '../getType/getType'

/**
 * Returns the matching data type for both values, otherwise, returns false.
 */
export const sameType = <T extends string = DataType>(targetA: unknown, targetB: unknown): T | false => {
  const firstType = getType<T>(targetA)
  const secondType = getType<T>(targetB)
  return firstType === secondType ? firstType : false
}
