export const throwError = (...lines: string[]) => {
  throw new Error(lines.join('\n.'))
}

export const isNotObject = (target: unknown): boolean => !target || typeof target !== 'object'

export const isNotValidString = (target: unknown): boolean => !target || typeof target !== 'string'

export const reviewNxVersion = 'Check if there are any breaking changes nx package version used'

export const isMissingFromContext = (thing: string) => `${thing} is missing from generator context`

export const isMissingFromProjectConfig = (thing: string) => `${thing} is missing from project configuration`
