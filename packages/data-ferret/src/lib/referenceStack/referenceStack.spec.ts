import { ReferenceStack } from './referenceStack.model'
import { referenceStack } from './referenceStack'
import { isMarker } from '../isMarker/isMarker'

describe('referenceStack', () => {
  let stack: ReferenceStack

  beforeEach(() => (stack = referenceStack()))

  it('returns size of stack', () => {
    expect(stack.size).toEqual(0)
    stack.add({})
    expect(stack.size).toEqual(1)
  })

  it('does not interfere with other reference stacks', () => {
    const value = {}
    const stack2 = referenceStack()
    stack.add(value)
    stack2.add(value)
    expect(stack.size).toEqual(1)
    expect(stack2.size).toEqual(1)
  })

  describe('exists', () => {
    beforeEach(() => (stack = referenceStack()))

    it('returns true when reference already exists in the stack', () => {
      const value = {}
      stack.add(value)
      expect(stack.exists(value)).toEqual(true)
    })

    it('returns false when reference has not been registered in the stack', () => {
      expect(stack.exists({})).toEqual(false)
    })

    it('returns false when reference is not iterable', () => {
      expect(stack.exists(-500)).toEqual(false)
      expect(stack.exists(null)).toEqual(false)
      expect(stack.exists(void 0)).toEqual(false)
    })
  })

  describe('lastSeen', () => {
    beforeEach(() => (stack = referenceStack()))

    it('returns a number corresponding to how long ago the reference was seen', () => {
      const [a, b, c] = [{}, {}, []]
      stack.add(a)
      expect(stack.lastSeen(a)).toEqual(-1)
      stack.add(b)
      expect(stack.lastSeen(b)).toEqual(-1)
      expect(stack.lastSeen(a)).toEqual(-2)
      stack.add(c)
      expect(stack.lastSeen(c)).toEqual(-1)
      expect(stack.lastSeen(b)).toEqual(-2)
      expect(stack.lastSeen(a)).toEqual(-3)
    })

    it('returns false when reference is not registered', () => {
      expect(stack.lastSeen({})).toBeNull()
      expect(stack.lastSeen([])).toBeNull()
    })

    it('returns false when reference is not iterable', () => {
      expect(stack.lastSeen(-500)).toBeNull()
      expect(stack.lastSeen(null)).toBeNull()
      expect(stack.lastSeen(void 0)).toBeNull()
    })
  })

  describe('add', () => {
    beforeEach(() => (stack = referenceStack()))

    it('registers a new reference in the stack', () => {
      expect(stack.size).toEqual(0)
      stack.add({})
      expect(stack.size).toEqual(1)
    })

    it('does not register a reference that already exists in the stack', () => {
      const value: unknown[] = []
      expect(stack.size).toEqual(0)
      stack.add(value)
      stack.add(value)
      expect(stack.size).toEqual(1)
    })

    it('does not register a reference that is not iterable', () => {
      stack.add(Symbol())
      stack.add(false)
      expect(stack.size).toEqual(0)
    })
  })

  describe('clear', () => {
    beforeEach(() => (stack = referenceStack()))

    it('clears the internal stack and remove any markers added', () => {
      const value = { a: { b: {} } }
      stack.add(value)
      stack.add(value.a)
      stack.add(value.a.b)
      expect(stack.size).toEqual(3)
      expect(Object.keys(value).some(isMarker)).toEqual(true)
      expect(Object.keys(value.a).some(isMarker)).toEqual(true)
      expect(Object.keys(value.a.b).some(isMarker)).toEqual(true)
      stack.clear()
      expect(stack.size).toEqual(0)
      expect(Object.keys(value).some(isMarker)).toEqual(false)
      expect(Object.keys(value.a).some(isMarker)).toEqual(false)
      expect(Object.keys(value.a.b).some(isMarker)).toEqual(false)
    })
  })
})
