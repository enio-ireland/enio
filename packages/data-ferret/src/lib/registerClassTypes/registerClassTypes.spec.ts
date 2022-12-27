import { deregisterClassTypes } from '../deregisterClassTypes/deregisterClassTypes'
import { registerClassTypes } from './registerClassTypes'
import { registeredClasses } from '../shared/consts'

describe('registerClassTypes', () => {
  beforeEach(() => deregisterClassTypes())

  afterAll(() => deregisterClassTypes())

  it('registers one or more classes as a unique data type', () => {
    class A {}
    class B {}
    registerClassTypes(A, B)
    expect(registeredClasses.length).toEqual(2)
    expect(registeredClasses).toContain(A)
    expect(registeredClasses).toContain(B)
  })

  it('ignores subsquent registration attempts for the same class', () => {
    class A {}
    registerClassTypes(A, A)
    registerClassTypes(A)
    expect(registeredClasses.length).toEqual(1)
    expect(registeredClasses).toContain(A)
  })
})
