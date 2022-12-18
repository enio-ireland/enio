import { registerClassTypes } from '../registerClassTypes/registerClassTypes'
import { deregisterClassTypes } from './deregisterClassTypes'
import { registeredClasses } from '../shared/consts'

describe('deregisterClassTypes', () => {
  class A {}
  class B {}
  class C {}
  class D {}

  beforeEach(() => registerClassTypes(A, B, C, D))

  afterAll(() => deregisterClassTypes())

  it('removes all registered classes', () => {
    deregisterClassTypes()
    expect(registeredClasses.length).toEqual(0)
  })

  it('remove specific registered classes', () => {
    deregisterClassTypes(B, C)
    expect(registeredClasses.length).toEqual(2)
    expect(registeredClasses).toContain(A)
    expect(registeredClasses).toContain(D)
  })
})
