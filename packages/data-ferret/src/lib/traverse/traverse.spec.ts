/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { setConfig } from '../shared/consts'
import { createTraversal, traverse } from './traverse'

const mockedTarget = {
  A: {
    alpha: [0, 1, 2],
    beta: {
      a: '1',
      b: '2'
    },
    gamma: { valid: true },
    delta: { valid: false }
  },
  B: {
    epsilon: 42,
    zeta: 'Lorem ipsum dolor sit amet.'
  },
  C: {}
}

describe('createTraversal', () => {
  it('creates a traverse function', () => {
    const traverseFn = createTraversal(() => true)
    expect(typeof traverseFn).toBe('function')
  })
})

describe('traverse', () => {
  it('throw error when incorrect arguments passed', () => {
    // @ts-expect-error TS2345 - deliberately passing wrong parameters
    expect(() => traverse({}, {})).toThrowError('Expected callback to be a function.')

    // @ts-expect-error TS2345 - deliberately passing wrong parameters
    expect(() => traverse({}, () => {}, [])).toThrowError('Expected options to be an object.')

    // @ts-expect-error TS2345 - deliberately passing wrong parameters
    expect(() => traverse({}, () => {}, { depth: {} })).toThrowError('Expected options.depth to be an array.')

    // @ts-expect-error TS2345 - deliberately passing wrong parameters
    expect(() => traverse({}, () => {}, { depth: ['0'] })).toThrowError('Expected options.depth.0 to be a number.')

    // @ts-expect-error TS2345 - deliberately passing wrong parameters
    expect(() => traverse({}, () => {}, { depth: [3, {}] })).toThrowError('Expected options.depth.1 to be a number or a string.')

    // @ts-expect-error TS2345 - deliberately passing wrong parameters
    expect(() => traverse({}, () => {}, { depth: [3, 'x'] })).toThrowError("Only valid string value in options.depth.1 is '*'.")
  })
})

describe('traverse - with config detectCircularReferences:false', () => {
  let target: unknown
  let callback: jest.Mock<void, [key: string, value: unknown, path: string[], state: any, parent: unknown]>

  const setupCallbackSpy = () => (callback = jest.fn((key, value, path, state, parent) => {}))

  beforeEach(() => (setConfig({ detectCircularReferences: false }), (target = { ...mockedTarget }), setupCallbackSpy()))

  afterEach(() => setConfig({ detectCircularReferences: false }))

  it('will invoke callback function for each data point', () => {
    traverse(target, callback)
    expect(callback).toHaveBeenCalledTimes(17)
    expect(callback).toHaveBeenCalledWith('', mockedTarget, [], {}, void 0)
    expect(callback).toHaveBeenCalledWith('A', mockedTarget.A, ['A'], {}, mockedTarget)
    expect(callback).toHaveBeenCalledWith('alpha', mockedTarget.A.alpha, ['A', 'alpha'], {}, mockedTarget.A)
    expect(callback).toHaveBeenCalledWith('0', mockedTarget.A.alpha[0], ['A', 'alpha', '0'], {}, mockedTarget.A.alpha)
    expect(callback).toHaveBeenCalledWith('1', mockedTarget.A.alpha[1], ['A', 'alpha', '1'], {}, mockedTarget.A.alpha)
    expect(callback).toHaveBeenCalledWith('2', mockedTarget.A.alpha[2], ['A', 'alpha', '2'], {}, mockedTarget.A.alpha)
    expect(callback).toHaveBeenCalledWith('beta', mockedTarget.A.beta, ['A', 'beta'], {}, mockedTarget.A)
    expect(callback).toHaveBeenCalledWith('a', mockedTarget.A.beta.a, ['A', 'beta', 'a'], {}, mockedTarget.A.beta)
    expect(callback).toHaveBeenCalledWith('b', mockedTarget.A.beta.b, ['A', 'beta', 'b'], {}, mockedTarget.A.beta)
    expect(callback).toHaveBeenCalledWith('gamma', mockedTarget.A.gamma, ['A', 'gamma'], {}, mockedTarget.A)
    expect(callback).toHaveBeenCalledWith('valid', mockedTarget.A.gamma.valid, ['A', 'gamma', 'valid'], {}, mockedTarget.A.gamma)
    expect(callback).toHaveBeenCalledWith('delta', mockedTarget.A.delta, ['A', 'delta'], {}, mockedTarget.A)
    expect(callback).toHaveBeenCalledWith('valid', mockedTarget.A.delta.valid, ['A', 'delta', 'valid'], {}, mockedTarget.A.delta)
    expect(callback).toHaveBeenCalledWith('B', mockedTarget.B, ['B'], {}, mockedTarget)
    expect(callback).toHaveBeenCalledWith('epsilon', mockedTarget.B.epsilon, ['B', 'epsilon'], {}, mockedTarget.B)
    expect(callback).toHaveBeenCalledWith('zeta', mockedTarget.B.zeta, ['B', 'zeta'], {}, mockedTarget.B)
    expect(callback).toHaveBeenCalledWith('C', mockedTarget.C, ['C'], {}, mockedTarget)
  })

  it('will visit data points within a specific depth range', () => {
    setupCallbackSpy()
    traverse(target, callback)
    expect(callback).toBeCalledTimes(17)

    setupCallbackSpy()
    traverse(target, callback, { depth: [] })
    expect(callback).toBeCalledTimes(17)

    setupCallbackSpy()
    traverse(target, callback, { depth: [0] })
    expect(callback).toBeCalledTimes(17)

    setupCallbackSpy()
    traverse(target, callback, { depth: [0, '*'] })
    expect(callback).toBeCalledTimes(17)

    setupCallbackSpy()
    traverse(target, callback, { depth: [0, 0] })
    expect(callback).toBeCalledTimes(1)

    setupCallbackSpy()
    traverse(target, callback, { depth: [1, 1] })
    expect(callback).toBeCalledTimes(3)

    setupCallbackSpy()
    traverse(target, callback, { depth: [2, 2] })
    expect(callback).toBeCalledTimes(6)

    setupCallbackSpy()
    traverse(target, callback, { depth: [2, 3] })
    expect(callback).toBeCalledTimes(13)

    setupCallbackSpy()
    traverse(target, callback, { depth: [4, 4] })
    expect(callback).toBeCalledTimes(0)
  })

  it('accepts an initial state value that persists on every iteration and returns said state', () => {
    callback = jest.fn((key, value, path, state, parent) => (state.count += 1))
    expect(traverse(target, callback, { depth: [] }, { count: 0 })).toEqual({ count: 17 })
  })
})

describe('traverse - with config detectCircularReferences:true', () => {
  let target: unknown
  let callback: jest.Mock<void, [key: string, value: unknown, path: string[], state: any, parent: unknown]>

  const setupCallbackSpy = () => (callback = jest.fn((key, value, path, state, parent) => {}))

  beforeEach(() => (setConfig({ detectCircularReferences: true }), (target = { ...mockedTarget }), setupCallbackSpy()))

  afterEach(() => setConfig({ detectCircularReferences: false }))

  it('will invoke callback function for each data point', () => {
    traverse(target, callback)
    expect(callback).toHaveBeenCalledTimes(17)
    expect(callback).toHaveBeenCalledWith('', mockedTarget, [], {}, void 0)
    expect(callback).toHaveBeenCalledWith('A', mockedTarget.A, ['A'], {}, mockedTarget)
    expect(callback).toHaveBeenCalledWith('alpha', mockedTarget.A.alpha, ['A', 'alpha'], {}, mockedTarget.A)
    expect(callback).toHaveBeenCalledWith('0', mockedTarget.A.alpha[0], ['A', 'alpha', '0'], {}, mockedTarget.A.alpha)
    expect(callback).toHaveBeenCalledWith('1', mockedTarget.A.alpha[1], ['A', 'alpha', '1'], {}, mockedTarget.A.alpha)
    expect(callback).toHaveBeenCalledWith('2', mockedTarget.A.alpha[2], ['A', 'alpha', '2'], {}, mockedTarget.A.alpha)
    expect(callback).toHaveBeenCalledWith('beta', mockedTarget.A.beta, ['A', 'beta'], {}, mockedTarget.A)
    expect(callback).toHaveBeenCalledWith('a', mockedTarget.A.beta.a, ['A', 'beta', 'a'], {}, mockedTarget.A.beta)
    expect(callback).toHaveBeenCalledWith('b', mockedTarget.A.beta.b, ['A', 'beta', 'b'], {}, mockedTarget.A.beta)
    expect(callback).toHaveBeenCalledWith('gamma', mockedTarget.A.gamma, ['A', 'gamma'], {}, mockedTarget.A)
    expect(callback).toHaveBeenCalledWith('valid', mockedTarget.A.gamma.valid, ['A', 'gamma', 'valid'], {}, mockedTarget.A.gamma)
    expect(callback).toHaveBeenCalledWith('delta', mockedTarget.A.delta, ['A', 'delta'], {}, mockedTarget.A)
    expect(callback).toHaveBeenCalledWith('valid', mockedTarget.A.delta.valid, ['A', 'delta', 'valid'], {}, mockedTarget.A.delta)
    expect(callback).toHaveBeenCalledWith('B', mockedTarget.B, ['B'], {}, mockedTarget)
    expect(callback).toHaveBeenCalledWith('epsilon', mockedTarget.B.epsilon, ['B', 'epsilon'], {}, mockedTarget.B)
    expect(callback).toHaveBeenCalledWith('zeta', mockedTarget.B.zeta, ['B', 'zeta'], {}, mockedTarget.B)
    expect(callback).toHaveBeenCalledWith('C', mockedTarget.C, ['C'], {}, mockedTarget)
  })

  it('will visit data points within a specific depth range', () => {
    setupCallbackSpy()
    traverse(target, callback)
    expect(callback).toBeCalledTimes(17)

    setupCallbackSpy()
    traverse(target, callback, { depth: [] })
    expect(callback).toBeCalledTimes(17)

    setupCallbackSpy()
    traverse(target, callback, { depth: [0] })
    expect(callback).toBeCalledTimes(17)

    setupCallbackSpy()
    traverse(target, callback, { depth: [0, '*'] })
    expect(callback).toBeCalledTimes(17)

    setupCallbackSpy()
    traverse(target, callback, { depth: [0, 0] })
    expect(callback).toBeCalledTimes(1)

    setupCallbackSpy()
    traverse(target, callback, { depth: [1, 1] })
    expect(callback).toBeCalledTimes(3)

    setupCallbackSpy()
    traverse(target, callback, { depth: [2, 2] })
    expect(callback).toBeCalledTimes(6)

    setupCallbackSpy()
    traverse(target, callback, { depth: [2, 3] })
    expect(callback).toBeCalledTimes(13)

    setupCallbackSpy()
    traverse(target, callback, { depth: [4, 4] })
    expect(callback).toBeCalledTimes(0)
  })

  it('correctly skips over circular references', () => {
    const target = { a: { b: { c: {} } } }
    target.a.b.c = target.a.b
    traverse(target, callback)
    expect(callback).toBeCalledTimes(3)
  })
})
