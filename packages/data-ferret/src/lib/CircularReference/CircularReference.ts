import { ICircularReference, Location, Target } from './CircularReference.model'

const expectedValidArrayErrorMessage = (targetName: string) => `Expected ${targetName} to be a list with at least on string value.`

export class CircularReference implements ICircularReference {
  public readonly location: Location
  public readonly target: Target
  private readonly keyDelimiter = '\u00B7'
  private readonly delimiter = ' → '

  constructor(location: Location['path'], target: Target['path']) {
    if (!Array.isArray(location) || !location.length) throw Error(expectedValidArrayErrorMessage('location'))
    if (!Array.isArray(target)) throw Error(expectedValidArrayErrorMessage('target'))
    this.location = { path: location }
    this.target = { path: target }
  }

  get depth(): number {
    return this.location.path.length - this.target.path.length
  }

  public readonly toString = (): string => `${this.join(this.location)}${this.delimiter}${this.join(this.target)}`

  public readonly toJSON = (): string => this.toString()

  private readonly join = ({ path }: Location | Target): string => path.join(this.keyDelimiter)
}
