import { registerClassTypes } from '../registerClassTypes/registerClassTypes'
import { getType } from './getType'

describe('getType', () => {
  it('should return "undefined" for a reference explicitely set to undefined', () => {
    expect(getType(undefined)).toEqual('undefined')
  })

  it('should return "undefined" for a reference explicitely set to void 0', () => {
    expect(getType(void 0)).toEqual('undefined')
  })

  it('should return "undefined" for a reference that does not exist', () => {
    // @ts-expect-error TS2339
    expect(getType({}.doesNotExist)).toEqual('undefined')
  })

  it('should return "boolean" for a reference set to true', () => {
    expect(getType(true)).toEqual('boolean')
  })

  it('should return "boolean" for a reference set to false', () => {
    expect(getType(false)).toEqual('boolean')
  })

  it('should return "number" for a reference set to a natural positive number', () => {
    expect(getType(1)).toEqual('number')
  })

  it('should return "number" for a reference set to a natural negative number', () => {
    expect(getType(-3)).toEqual('number')
  })

  it('should return "number" for a reference set to a 0', () => {
    expect(getType(0)).toEqual('number')
  })

  it('should return "number" for a reference set to a decimal', () => {
    expect(getType(3.4567)).toEqual('number')
  })

  it('should return "number" for a reference set to a fraction', () => {
    expect(getType(3 / 5)).toEqual('number')
  })

  it('should return "number" for a reference set to Infinity', () => {
    expect(getType(Infinity)).toEqual('number')
  })

  it('should return "number" for a reference set to NaN', () => {
    expect(getType(NaN)).toEqual('number')
  })

  it('should not return "number" for a reference set string containing a number', () => {
    expect(getType('150')).not.toEqual('number')
    expect(getType('-20')).not.toEqual('number')
  })

  it('should return "bigint" for a reference set to BigInt', () => {
    expect(getType(BigInt(9007199254740991))).toEqual('bigint')
    expect(getType(BigInt('9007199254740991'))).toEqual('bigint')
    expect(getType(BigInt('0x1fffffffffffff'))).toEqual('bigint')
    expect(getType(BigInt('0o377777777777777777'))).toEqual('bigint')
    expect(getType(BigInt('0b11111111111111111111111111111111111111111111111111111'))).toEqual('bigint')
  })

  it('should return "string" for a reference set to string', () => {
    expect(getType('')).toEqual('string')
    expect(getType(' ')).toEqual('string')
    expect(getType('t')).toEqual('string')
    expect(getType('text')).toEqual('string')
  })

  it('should return "null" for a reference set to null', () => {
    expect(getType(null)).toEqual('null')
  })

  it('should return "array" for a reference set to array literal', () => {
    expect(getType([])).toEqual('array')
  })

  it('should return "array" for a reference set to instance of Array', () => {
    expect(getType(new Array(1))).toEqual('array')
  })

  it('should return "object" for a reference set to object literal', () => {
    expect(getType({})).toEqual('object')
  })

  it('should return "object" for a reference set to instance of Object', () => {
    expect(getType(new Object())).toEqual('object')
  })

  it('should return "object" for a reference set to instance of any class', () => {
    class AnyClass {}
    expect(getType(new AnyClass())).toEqual('object')
  })

  it('should return "function" for a reference set to a function', () => {
    expect(getType(function () {})).toEqual('function')
  })

  it('should return "function" for a reference set to an arrow function', () => {
    expect(getType(() => {})).toEqual('function')
  })

  it('should return "function" for a reference set to an async function', () => {
    async function noOP() {}
    expect(getType(noOP)).toEqual('function')
  })

  it('should return "function" for a reference set to function using "this." syntax similar to old school "classes" before they were supported', () => {
    function oldschool() {
      // @ts-expect-error TS2683
      this.message = 'hello'
      // @ts-expect-error TS2683
      return this
    }
    expect(getType(oldschool)).toEqual('function')
  })

  it('should return "symbol" for a reference set to a Symbol', () => {
    expect(getType(Symbol())).toEqual('symbol')
  })

  it('should return "symbol" for a reference set to a named Symbol', () => {
    expect(getType(Symbol('foo'))).toEqual('symbol')
  })
})

describe('getType - extended class types', () => {
  class A {}

  beforeEach(() => registerClassTypes(A))

  afterEach(() => registerClassTypes())

  it('should return the class name as data type the for a reference set to an instance of the corresponding class', () => {
    expect(getType(new A())).toEqual('A')
  })

  it("should return 'object' for a reference set to an object, despite having same apparent interface to a registered class", () => {
    expect(getType({})).toEqual('object')
  })
})
