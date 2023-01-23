import { registeredIterableClasses } from '../shared/consts'
import { DataType, RegisteredIterableClassEntry } from '../shared/model'
import { IterableOperators } from './getIterableOperators.model'

export const getIterableOperators = <T extends string = DataType>(dataType: T): IterableOperators => {
  const { instantiate, getKeys, read, write } = registeredIterableClasses.find(
    e => e.classRef.name.toLowerCase() === dataType.toLowerCase()
  ) as RegisteredIterableClassEntry<unknown>
  return { instantiate, getKeys, read, write }
}
