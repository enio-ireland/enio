export interface Location {
  path: string[]
}

export interface ICircularReference {
  readonly location: Location
  readonly target: Location
  readonly depth: number
}
