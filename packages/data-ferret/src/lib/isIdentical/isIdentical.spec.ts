/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Config } from '../shared/model'
import { setConfig } from '../shared/consts'
import { isIdentical } from './isIdentical'
import { registerIterableClass } from '../registerIterableClass/registerIterableClass'
import { deregisterIterableClass } from '../deregisterIterableClass/deregisterIterableClass'

const configReset: Config = Object.freeze({
  samePositionOfOwnProperties: false,
  detectCircularReferences: false
})

describe('isIdentical', () => {
  beforeEach(() => setConfig(configReset))

  it('returns true when strict check quality check is true', () => {
    expect(isIdentical(25, 25)).toEqual(true)
    expect(isIdentical(null, null)).toEqual(true)
    expect(isIdentical(undefined, void 0)).toEqual(true)
    expect(isIdentical('hello world', 'hello world')).toEqual(true)
  })

  it('returns true when strict check quality check is true for non-primitive data type references', () => {
    const array: unknown[] = []
    expect(isIdentical(array, array)).toEqual(true)

    const object = {}
    expect(isIdentical(object, object)).toEqual(true)
  })

  it('returns true for empty iterables of the same type', () => {
    expect(isIdentical({}, {})).toEqual(true)
    expect(isIdentical([], [])).toEqual(true)
  })

  it('returns true when complex types have same key value pairs', () => {
    expect(isIdentical({ a: 1 }, { a: 1 })).toEqual(true)
    expect(isIdentical(['banana'], ['banana'])).toEqual(true)
  })

  it('returns true for non-indexed iterables whose keys match, but are in wrong order', () => {
    expect(isIdentical({ a: 1, b: '2' }, { b: '2', a: 1 })).toEqual(true)
  })

  it('returns true for functions that have the exact same declaration, arguments, and content', () => {
    expect(
      isIdentical(
        function () {},
        function () {}
      )
    ).toEqual(true)
    expect(
      isIdentical(
        () => {},
        () => {}
      )
    ).toEqual(true)
    expect(
      isIdentical(
        function A(...args: unknown[]) {},
        function A(...args: unknown[]) {}
      )
    ).toEqual(true)

    expect(
      isIdentical(
        (_: unknown) => void 0,
        (_: unknown) => void 0
      )
    ).toEqual(true)
  })

  it('returns false for functions with different content', () => {
    expect(
      isIdentical(
        function () {
          console.log(void 0)
        },
        function () {}
      )
    ).toEqual(false)
  })

  it('returns false for functions with different declaration/assignment', () => {
    expect(
      isIdentical(
        function () {},
        () => {}
      )
    ).toEqual(false)

    const funcA = () => {}
    expect(isIdentical(funcA, function funcA() {})).toEqual(false)
  })

  it('returns false for lists with items in the wrong order', () => {
    expect(isIdentical([1, 2, 3], [3, 1, 2])).toEqual(false)
    expect(isIdentical([4, 1, 2], [3, 2, 4])).toEqual(false)
  })

  it('returns false for values that do not match', () => {
    expect(isIdentical(Symbol(), Symbol())).toEqual(false)
    expect(isIdentical('', [])).toEqual(false)
    expect(isIdentical([], {})).toEqual(false)
    expect(isIdentical(-23, 23)).toEqual(false)
    expect(isIdentical(undefined, null)).toEqual(false)
  })

  it('throws an error when given values with circular references and detection is OFF', () => {
    const [selfReferencingObjectA, selfReferencingObjectB] = [{ a: {} }, { a: {} }]
    selfReferencingObjectA.a = selfReferencingObjectA
    selfReferencingObjectB.a = selfReferencingObjectB
    expect(() => isIdentical(selfReferencingObjectA, selfReferencingObjectB)).toThrowError()
  })

  it('returns true when when given values with circular references that point to the same object in memory', () => {
    const selfReferencingObjectA = { a: {} }
    selfReferencingObjectA.a = selfReferencingObjectA
    expect(isIdentical(selfReferencingObjectA, selfReferencingObjectA)).toEqual(true)
  })
})

describe('isIdentical - with config samePositionOfOwnProperties: true', () => {
  beforeEach(() => setConfig({ samePositionOfOwnProperties: true }))

  afterEach(() => setConfig(configReset))

  it('returns false for non-indexed iterables whose keys match, but are in wrong order', () => {
    expect(isIdentical({ a: 1, b: '2' }, { b: '2', a: 1 })).toEqual(false)
  })
})

describe('isIdentical - with config detectCircularReferences:true', () => {
  beforeEach(() =>
    setConfig({
      detectCircularReferences: true,
      samePositionOfOwnProperties: false
    })
  )

  afterEach(() => setConfig(configReset))

  it('returns true when strict check quality check is true', () => {
    expect(isIdentical(25, 25)).toEqual(true)
    expect(isIdentical(null, null)).toEqual(true)
    expect(isIdentical(undefined, void 0)).toEqual(true)
    expect(isIdentical('hello world', 'hello world')).toEqual(true)
  })

  it('returns true when strict check quality check is true for non-primitive data type references', () => {
    const array: unknown[] = []
    expect(isIdentical(array, array)).toEqual(true)

    const object = {}
    expect(isIdentical(object, object)).toEqual(true)
  })

  it('returns true for empty iterables of the same type', () => {
    expect(isIdentical({}, {})).toEqual(true)
    expect(isIdentical([], [])).toEqual(true)
  })

  it('returns true when complex types have same key value pairs', () => {
    expect(isIdentical({ a: 1 }, { a: 1 })).toEqual(true)
    expect(isIdentical(['banana'], ['banana'])).toEqual(true)
  })

  it('returns true for non-indexed iterables whose keys match, but are in wrong order', () => {
    expect(isIdentical({ a: 1, b: '2' }, { b: '2', a: 1 })).toEqual(true)
  })

  it('returns true for functions that have the exact same declaration, arguments, and content', () => {
    expect(
      isIdentical(
        function () {},
        function () {}
      )
    ).toEqual(true)
    expect(
      isIdentical(
        () => {},
        () => {}
      )
    ).toEqual(true)
    expect(
      isIdentical(
        function A(...args: unknown[]) {},
        function A(...args: unknown[]) {}
      )
    ).toEqual(true)

    expect(
      isIdentical(
        (_: unknown) => void 0,
        (_: unknown) => void 0
      )
    ).toEqual(true)
  })

  it('returns false for functions with different content', () => {
    expect(
      isIdentical(
        function () {
          console.log(void 0)
        },
        function () {}
      )
    ).toEqual(false)
  })

  it('returns false for functions with different declaration/assignment', () => {
    expect(
      isIdentical(
        function () {},
        () => {}
      )
    ).toEqual(false)

    const funcA = () => {}
    expect(isIdentical(funcA, function funcA() {})).toEqual(false)
  })

  it('returns false for lists with items in the wrong order', () => {
    expect(isIdentical([1, 2, 3], [3, 1, 2])).toEqual(false)
    expect(isIdentical([4, 1, 2], [3, 2, 4])).toEqual(false)
  })

  it('returns false for values that do not match', () => {
    expect(isIdentical(Symbol(), Symbol())).toEqual(false)
    expect(isIdentical('', [])).toEqual(false)
    expect(isIdentical([], {})).toEqual(false)
    expect(isIdentical(-23, 23)).toEqual(false)
    expect(isIdentical(undefined, null)).toEqual(false)
  })

  it('returns true when given values with the exact same circular references', () => {
    const [selfReferencingObjectA, selfReferencingObjectB] = [{ a: {} }, { a: {} }]
    selfReferencingObjectA.a = selfReferencingObjectA
    selfReferencingObjectB.a = selfReferencingObjectB
    expect(isIdentical(selfReferencingObjectA, selfReferencingObjectB)).toEqual(true)
  })

  it('returns false when given values with the different same circular references', () => {
    const [selfReferencingObjectA, selfReferencingObjectB] = [{ a: { b: { c: {} } } }, { a: { b: { c: {} } } }]
    selfReferencingObjectA.a.b.c = selfReferencingObjectA
    selfReferencingObjectB.a.b.c = selfReferencingObjectB.a.b
    expect(isIdentical(selfReferencingObjectA, selfReferencingObjectB)).toEqual(false)

    const [selfReferencingObjectC, selfReferencingObjectD] = [{ a: { b: { c: { d: {} } } } }, { a: { b: {} } }]
    selfReferencingObjectC.a.b.c.d = selfReferencingObjectC
    selfReferencingObjectD.a.b = selfReferencingObjectD
    expect(isIdentical(selfReferencingObjectC, selfReferencingObjectD)).toEqual(false)

    const [selfReferencingObjectE, selfReferencingObjectF] = [{ a: { b: { c: { d: {} } } } }, { a: { b: {} } }]
    selfReferencingObjectE.a.b.c.d = selfReferencingObjectE
    selfReferencingObjectF.a.b = { c: { d: selfReferencingObjectF.a } }
    expect(isIdentical(selfReferencingObjectE, selfReferencingObjectF)).toEqual(false)
  })

  it('returns true when given mutually referencing values whose circular references mirror each other exactly', () => {
    const [selfReferencingObjectG, selfReferencingObjectH] = [{ a: { b: {} } }, { a: { b: {} } }]
    selfReferencingObjectG.a.b = selfReferencingObjectH
    selfReferencingObjectH.a.b = selfReferencingObjectG
    expect(isIdentical(selfReferencingObjectG, selfReferencingObjectH)).toEqual(true)
  })

  it('returns false when given mutually referencing values whose circular references mirror do not each other exactly', () => {
    const [selfReferencingObjectG, selfReferencingObjectH] = [{ a: { b: {} } }, { a: { b: {} } }]
    selfReferencingObjectG.a.b = selfReferencingObjectH
    selfReferencingObjectH.a.b = selfReferencingObjectG.a
    expect(isIdentical(selfReferencingObjectG, selfReferencingObjectH)).toEqual(false)
  })
})

describe('isIdentical - with config detectCircularReferences:true, samePositionOfOwnProperties: true', () => {
  beforeEach(() =>
    setConfig({
      detectCircularReferences: true,
      samePositionOfOwnProperties: true
    })
  )

  afterEach(() => setConfig(configReset))

  it('returns false for non-indexed iterables whose keys match, but are in wrong order', () => {
    expect(isIdentical({ a: 1, b: '2' }, { b: '2', a: 1 })).toEqual(false)
  })
})

describe('isIdentical - with extended iterable class types', () => {
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

  afterEach(() => deregisterIterableClass())

  it('returns true for custom iterables of the same type and content', () => {
    const map = new Map<string, number>()
    const map2 = new Map<string, number>()
    map.set('emerald', 65)
    map2.set('emerald', 65)
    expect(isIdentical(map, map2)).toEqual(true)
  })

  it('returns false for custom iterables of the same type but different value', () => {
    const map = new Map<string, number>()
    const map2 = new Map<string, number>()
    map.set('emerald', 65)
    map2.set('ruby', 54)
    expect(isIdentical(map, map2)).toEqual(false)
  })

  it('returns false for custom iterables of a different type', () => {
    const map = new Map<string, number>()
    const set = new Set<string>()
    map.set('emerald', 65)
    set.add('ruby')
    expect(isIdentical(map, set)).toEqual(false)
  })
})
