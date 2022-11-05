import { Config } from '../shared/model'
import { setConfig } from '../shared/consts'
import { isIdentical } from './isIdentical'

const configReset: Config = Object.freeze({
  samePositionOfOwnProperties: false,
  detectCircularReferences: false
})

describe('isIdentical', () => {
  beforeEach(() => setConfig(configReset))

  it('should return true when strict check quality check is true', () => {
    expect(isIdentical(25, 25)).toEqual(true)
    expect(isIdentical(null, null)).toEqual(true)
    expect(isIdentical(undefined, void 0)).toEqual(true)
    expect(isIdentical('hello world', 'hello world')).toEqual(true)
  })

  it('should return true when strict check quality check is true for non-primitive data type references', () => {
    const array: unknown[] = []
    expect(isIdentical(array, array)).toEqual(true)

    const object = {}
    expect(isIdentical(object, object)).toEqual(true)
  })

  it('should return true for empty iterables of the same type', () => {
    expect(isIdentical({}, {})).toEqual(true)
    expect(isIdentical([], [])).toEqual(true)
  })

  it('should return true when complex types have same key value pairs', () => {
    expect(isIdentical({ a: 1 }, { a: 1 })).toEqual(true)
    expect(isIdentical(['banana'], ['banana'])).toEqual(true)
  })

  it('should return true for non-indexed iterables whose keys match, but are in wrong order', () => {
    expect(isIdentical({ a: 1, b: '2' }, { b: '2', a: 1 })).toEqual(true)
  })

  it('should return false for lists with items in the wrong order', () => {
    expect(isIdentical([1, 2, 3], [3, 1, 2])).toEqual(false)
    expect(isIdentical([4, 1, 2], [3, 2, 4])).toEqual(false)
  })

  it('should return false for values that do not match', () => {
    expect(isIdentical(Symbol(), Symbol())).toEqual(false)
    expect(isIdentical('', [])).toEqual(false)
    expect(isIdentical([], {})).toEqual(false)
    expect(isIdentical(-23, 23)).toEqual(false)
    expect(isIdentical(undefined, null)).toEqual(false)
  })

  it('should throw an error when given values with circular references and detection is OFF', () => {
    const [selfReferencingObjectA, selfReferencingObjectB] = [{ a: {} }, { a: {} }]
    selfReferencingObjectA.a = selfReferencingObjectA
    selfReferencingObjectB.a = selfReferencingObjectB
    expect(() => isIdentical(selfReferencingObjectA, selfReferencingObjectB)).toThrowError()
  })

  it('should return true when when given values with circular references that point to the same object in memory', () => {
    const selfReferencingObjectA = { a: {} }
    selfReferencingObjectA.a = selfReferencingObjectA
    expect(isIdentical(selfReferencingObjectA, selfReferencingObjectA)).toEqual(true)
  })
})

describe('isIdentical - with config samePositionOfOwnProperties: true', () => {
  beforeEach(() => setConfig({ samePositionOfOwnProperties: true }))

  afterEach(() => setConfig(configReset))

  it('should return false for non-indexed iterables whose keys match, but are in wrong order', () => {
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

  it('should return true when strict check quality check is true', () => {
    expect(isIdentical(25, 25)).toEqual(true)
    expect(isIdentical(null, null)).toEqual(true)
    expect(isIdentical(undefined, void 0)).toEqual(true)
    expect(isIdentical('hello world', 'hello world')).toEqual(true)
  })

  it('should return true when strict check quality check is true for non-primitive data type references', () => {
    const array: unknown[] = []
    expect(isIdentical(array, array)).toEqual(true)

    const object = {}
    expect(isIdentical(object, object)).toEqual(true)
  })

  it('should return true for empty iterables of the same type', () => {
    expect(isIdentical({}, {})).toEqual(true)
    expect(isIdentical([], [])).toEqual(true)
  })

  it('should return true when complex types have same key value pairs', () => {
    expect(isIdentical({ a: 1 }, { a: 1 })).toEqual(true)
    expect(isIdentical(['banana'], ['banana'])).toEqual(true)
  })

  it('should return true for non-indexed iterables whose keys match, but are in wrong order', () => {
    expect(isIdentical({ a: 1, b: '2' }, { b: '2', a: 1 })).toEqual(true)
  })

  it('should return false for lists with items in the wrong order', () => {
    expect(isIdentical([1, 2, 3], [3, 1, 2])).toEqual(false)
    expect(isIdentical([4, 1, 2], [3, 2, 4])).toEqual(false)
  })

  it('should return false for values that do not match', () => {
    expect(isIdentical(Symbol(), Symbol())).toEqual(false)
    expect(isIdentical('', [])).toEqual(false)
    expect(isIdentical([], {})).toEqual(false)
    expect(isIdentical(-23, 23)).toEqual(false)
    expect(isIdentical(undefined, null)).toEqual(false)
  })

  it('should return true when given values with the exact same circular references', () => {
    const [selfReferencingObjectA, selfReferencingObjectB] = [{ a: {} }, { a: {} }]
    selfReferencingObjectA.a = selfReferencingObjectA
    selfReferencingObjectB.a = selfReferencingObjectB
    expect(isIdentical(selfReferencingObjectA, selfReferencingObjectB)).toEqual(true)
  })

  it('should return false when given values with the different same circular references', () => {
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

  it('should return true when given mutually referencing values whose circular references mirror each other exactly', () => {
    const [selfReferencingObjectG, selfReferencingObjectH] = [{ a: { b: {} } }, { a: { b: {} } }]
    selfReferencingObjectG.a.b = selfReferencingObjectH
    selfReferencingObjectH.a.b = selfReferencingObjectG
    expect(isIdentical(selfReferencingObjectG, selfReferencingObjectH)).toEqual(true)
  })

  it('should return false when given mutually referencing values whose circular references mirror do not each other exactly', () => {
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

  it('should return false for non-indexed iterables whose keys match, but are in wrong order', () => {
    expect(isIdentical({ a: 1, b: '2' }, { b: '2', a: 1 })).toEqual(false)
  })
})
