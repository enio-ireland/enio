export interface Location {
  path: [string, ...string[]]
}

export interface Target {
  path: string[]
}

export interface ICircularReference {
  readonly location: Location
  readonly target: Target
  readonly depth: number
}
