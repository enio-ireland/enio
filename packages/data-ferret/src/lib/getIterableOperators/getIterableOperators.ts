import { registeredIterableClasses } from '../shared/consts'
import { DataType, RegisteredIterableClassEntry } from '../shared/model'
import { IterableOperators } from './getIterableOperators.model'

export const getIterableOperators = <T extends string = DataType>(dataType: T): IterableOperators => {
  const { getKeys, read, write, remove, instantiate } = registeredIterableClasses.find(
    e => e.classRef.name.toLowerCase() === dataType.toLowerCase()
  ) as RegisteredIterableClassEntry<unknown>
  return { getKeys, read, write, remove, instantiate }
}
