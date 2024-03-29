export type { Predicate, DataType } from './lib/shared/model'
export { setConfig } from './lib/shared/consts'
export { getConfig } from './lib/shared/consts'
export { registerClassTypes } from './lib/registerClassTypes/registerClassTypes'
export { registerIterableClass } from './lib/registerIterableClass/registerIterableClass'
export { deregisterClassTypes } from './lib/deregisterClassTypes/deregisterClassTypes'
export { deregisterIterableClass } from './lib/deregisterIterableClass/deregisterIterableClass'
export { getType } from './lib/getType/getType'
export { sameType } from './lib/sameType/sameType'
export { sameStructure } from './lib/sameStructure/sameStructure'
export { isIterable } from './lib/isIterable/isIterable'
export { hasCircularReference } from './lib/hasCircularReference/hasCircularReference'
export { locateCircularReference } from './lib/locateCircularReference/locateCircularReference'
export { isIdentical } from './lib/isIdentical/isIdentical'
export { containsKeys } from './lib/containsKeys/containsKeys'
export { selectiveCopy } from './lib/selectiveCopy/selectiveCopy'
export { traverse, createTraversal } from './lib/traverse/traverse'
export { getValue } from './lib/getValue/getValue'
export { getDepth } from './lib/getDepth/getDepth'
export { locateKey } from './lib/locateKey/locateKey'
export { getUniqueKeys } from './lib/getUniqueKeys/getUniqueKeys'
export { locateText } from './lib/locateText/locateText'
export { renameKey } from './lib/renameKey/renameKey'
export { removeKey } from './lib/removeKey/removeKey'
export { replaceText } from './lib/replaceText/replaceText'
