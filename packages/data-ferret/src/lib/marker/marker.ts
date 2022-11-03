export const marker = (): string => {
  const random = Math.round(Math.random() * 10000000000000)
  const sequential = new Date().getTime()
  const unique = `${random}${sequential}`
  const prefix = '__$'
  return `${prefix}${unique}`
}
