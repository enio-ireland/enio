import type { Token, Reference } from '../shared/model'
import { getTokenByName } from '../getTokenByName/getTokenByName'
import { replaceKeys } from '../replaceKeys/replaceKeys'

export const getReference = (token: Token, tokens: Token[], names: string[]): Reference => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const serializedReference = {} as Record<string, any>
  const reference = {} as Reference

  const toJSON = () => serializedReference
  Object.defineProperty(reference, 'toJSON', { value: toJSON, writable: false, enumerable: false, configurable: false })

  const path = names.map(name => getTokenByName(name, tokens).path).join('/')
  Object.defineProperty(reference, 'path', {
    get() {
      return path
    },
    enumerable: false,
    configurable: false
  })
  serializedReference['path'] = path

  const pathWithKeys = (map: Record<string, string>) => replaceKeys(path, map)
  Object.defineProperty(reference, 'pathWithKeys', { value: pathWithKeys, writable: false, enumerable: false, configurable: false })
  serializedReference['pathWithKeys'] = '[Function]'

  let child: Token
  token.children.forEach(childName => {
    try {
      child = getTokenByName(childName, tokens)
    } catch {
      throw new Error(`Could find a child named '${childName}' for '${token.name}'.`)
    }
    const childRef = getReference(child, tokens, [...names, child.name])
    const propertyName = child.key
    Object.defineProperty(reference, propertyName, { value: childRef, writable: false, configurable: false })
    serializedReference[propertyName] = `[Reference:${child.name}]`
  })

  return reference
}
