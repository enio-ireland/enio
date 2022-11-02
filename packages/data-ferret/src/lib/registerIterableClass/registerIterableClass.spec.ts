import { registerIterableClass } from './registerIterableClass'
import { registeredIterableClasses, registeredClasses } from '../shared/consts'

describe('registerIterableClass', () => {
  beforeEach(() => registerIterableClass())

  it("should unset list of registered iterable classes expect 'array' and 'object' entries", () => {
    expect(registeredIterableClasses.length).toEqual(2)
    expect(registeredIterableClasses[0].classRef).toEqual(Array)
    expect(registeredIterableClasses[1].classRef).toEqual(Object)
  })

  it('should add to the list of registered iterable classes', () => {
    registerIterableClass(
      { classRef: Map, getKeys: map => Array.from(map.keys()) as string[] },
      { classRef: Set, getKeys: map => Array.from(map.keys()) as string[] }
    )
    expect(registeredIterableClasses.length).toEqual(4)
    expect(registeredIterableClasses[0].classRef).toEqual(Map)
    expect(registeredIterableClasses[1].classRef).toEqual(Set)
    expect(registeredIterableClasses[2].classRef).toEqual(Array)
    expect(registeredIterableClasses[3].classRef).toEqual(Object)
  })

  it('should register the corresponding class data types', () => {
    registerIterableClass(
      { classRef: Map, getKeys: map => Array.from(map.keys()) as string[] },
      { classRef: Set, getKeys: map => Array.from(map.keys()) as string[] }
    )
    expect(registeredClasses).toContainEqual(Map)
    expect(registeredClasses).toContainEqual(Set)
  })
})
