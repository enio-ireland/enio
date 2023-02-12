/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Token } from '../shared/model'
import { getReference } from './getReference'

describe('getReference', () => {
  it('throws an error when list of tokens is incomplete', () => {
    const root = { name: 'y', key: 'Y', path: 'ipsilon', children: ['z'], root: true }
    const tokens = [root] as Token[]
    expect(() => getReference(root, tokens, [])).toThrowError("Could find a child named 'z' for 'y'.")
  })

  it('returns an object representing a point on the database', () => {
    const aToken: Token = { name: 'a', key: 'A', path: 'alpha', children: [], root: false }
    const bToken: Token = { name: 'b', key: 'B', path: 'beta', children: [], root: false }
    const zToken: Token = { name: 'z', key: 'Z', path: 'zeta', children: [aToken.name, bToken.name], root: false }
    const root: Token = { name: 'y', key: 'Y', path: 'ipsilon', children: [zToken.name], root: true }
    const tokens = [zToken, aToken, root, bToken] as Token[]
    const rootRef = getReference(root, tokens, []) as any
    expect(rootRef.path).toEqual('')
    expect(rootRef.Z.path).toEqual('zeta')
    expect(rootRef.Z.A.path).toEqual('zeta/alpha')
    expect(rootRef.Z.B.path).toEqual('zeta/beta')
  })

  it('returns path with dynamic values replaced when calling', () => {
    const aToken: Token = { name: 'a', key: 'A', path: 'alpha/[version]', children: [], root: false }
    const zToken: Token = { name: 'z', key: 'Z', path: 'zeta/[project]', children: [aToken.name], root: false }
    const root: Token = { name: 'y', key: 'Y', path: 'ipsilon', children: [zToken.name], root: true }
    const tokens = [zToken, aToken, root] as Token[]
    const rootRef = getReference(root, tokens, []) as any
    expect(rootRef.Z.pathWithKeys({ project: '345h3jcd' })).toEqual('zeta/345h3jcd')
    expect(rootRef.Z.A.pathWithKeys({ project: '345h3jcd', version: '2' })).toEqual('zeta/345h3jcd/alpha/2')
  })

  it('serializes content when called with JSON.stringify', () => {
    const aToken: Token = { name: 'a', key: 'A', path: 'alpha', children: [], root: false }
    const zToken: Token = { name: 'z', key: 'Z', path: 'zeta', children: [aToken.name], root: false }
    const root: Token = { name: 'y', key: 'Y', path: 'ipsilon', children: [zToken.name], root: true }
    const tokens = [zToken, aToken, root] as Token[]
    const rootRef = getReference(root, tokens, []) as any
    expect(rootRef.toJSON()).toEqual({ Z: '[Reference:z]', path: '', pathWithKeys: '[Function]' })
    expect(rootRef.Z.toJSON()).toEqual({ A: '[Reference:a]', path: 'zeta', pathWithKeys: '[Function]' })
    expect(rootRef.Z.A.toJSON()).toEqual({ path: 'zeta/alpha', pathWithKeys: '[Function]' })
  })
})
