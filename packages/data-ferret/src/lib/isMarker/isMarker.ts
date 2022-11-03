export const isMarker = (text: string): boolean => {
  if (!text || typeof text !== 'string' || text.length !== 29 || !text.includes('__$')) return false
  return /^__\$[0-9]{26}$/.test(text)
}
