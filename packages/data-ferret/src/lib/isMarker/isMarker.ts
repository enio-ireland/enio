export const isMarker = (text: string): boolean => {
  if (!text || typeof text !== 'string' || !text.includes('__$')) return false
  return /^__\$[0-9]+$/.test(text)
}
