import { registerIterableClass } from '../registerIterableClass/registerIterableClass'
import { deregisterIterableClass } from './deregisterIterableClass'
import { registeredClasses, registeredIterableClasses } from '../shared/consts'

describe('deregisterIterableClass', () => {
  beforeEach(() => {
    registerIterableClass<Map<unknown, unknown>>(
      Map,
      map => Array.from(map.keys()) as string[],
      (map, key) => map.get(key),
      (map, value, key) => map.set(key, value),
      (map, key) => map.delete(key)
    )
    registerIterableClass<Set<unknown>>(
      Set,
      set => Array.from(set.keys()) as string[],
      (_, key) => key,
      (set, value) => set.add(value),
      (set, key) => set.delete(key)
    )
  })

  afterAll(() => deregisterIterableClass())

  it('removes all registered iterable classes except built-in support for Object and Array', () => {
    deregisterIterableClass()
    const classRefs = registeredIterableClasses.map(e => e.classRef)
    expect(classRefs.length).toEqual(2)
    expect(classRefs).toContain(Object)
    expect(classRefs).toContain(Array)
  })

  it('remove specific registered iterable classes', () => {
    deregisterIterableClass(Map)
    const classRefs = registeredIterableClasses.map(e => e.classRef)
    expect(classRefs.length).toEqual(3)
    expect(classRefs).toContain(Object)
    expect(classRefs).toContain(Array)
    expect(classRefs).toContain(Set)
  })

  it('additionally removes iterable classes from registered classes', () => {
    deregisterIterableClass()
    expect(registeredClasses).not.toContain(Map)
    expect(registeredClasses).not.toContain(Set)
  })
})
