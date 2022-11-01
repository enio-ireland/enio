import { DataType } from '../shared/model'

export const getType = (identity: unknown): DataType => {
  if (identity === null) return 'null'
  const it = typeof identity
  if (it === 'object') if (Array.isArray(identity)) return 'array'
  return it
}
