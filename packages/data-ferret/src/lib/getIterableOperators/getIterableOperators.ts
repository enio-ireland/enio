import { registeredIterableClasses } from '../shared/consts'
import { DataType, RegisteredIterableClassEntry } from '../shared/model'

export const getIterableOperators = <T extends string = DataType>(dataType: T) => {
  const { instantiate, getKeys, write } = registeredIterableClasses.find(e => e.classRef.name === dataType) as RegisteredIterableClassEntry<unknown>
  return { instantiate, getKeys, write }
}
