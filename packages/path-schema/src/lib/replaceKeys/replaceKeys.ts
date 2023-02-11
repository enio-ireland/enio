export const replaceKeys = (original: string, replacements: Record<string, string>): string => {
  if (!replacements || typeof replacements !== 'object' || Array.isArray(replacements)) {
    throw new Error('Expected replacements to an dictinary, where keys are value to replace, and value is the value to replace with.')
  }
  const newText = Object.entries(replacements).reduce(
    (text, [target, newValue]) => text.replace(new RegExp(`\\[${target}\\]`, 'g'), newValue),
    original
  )
  const matches = Array.from(newText.match(/(?<=\[)[^\]]*(?=\])/g) || [])
  if (matches.length) {
    throw new Error(`Some dynamic values have not been replaced. See ${matches.map(m => `'${m}'`).join(', ')}.`)
  }
  return newText
}
