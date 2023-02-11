export interface Token {
  name: string
  key: string
  path: string
  children: string[]
  root: boolean
}

export interface Reference {
  path: string
  pathWithKeys: (map?: Record<string, string>) => string
}
