import { registerClassTypes } from './registerClassTypes'
import { registeredClasses } from '../shared/consts'

describe('registerClassTypes', () => {
  it('registers one or more class as a unique data type', () => {
    class A {}
    class B {}
    registerClassTypes(A, B)
    expect(new registeredClasses[0]()).toBeInstanceOf(A)
    expect(new registeredClasses[1]()).toBeInstanceOf(B)
  })

  it('clears previous registered classes and registers the next collection of classes as data type', () => {
    class C {}
    class D {}
    registerClassTypes(C, D)
    expect(new registeredClasses[0]()).toBeInstanceOf(C)
    expect(new registeredClasses[1]()).toBeInstanceOf(D)
  })
})
