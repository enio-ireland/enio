import { ICircularReference, Location } from './CircularReference.model'

const isNotValidArray = (target: unknown) => (!Array.isArray(target) || !target.length)

const expectedValidArrayErrorMessage = (targetName: string) => `Expected ${targetName} to be a list with at least on string value.`

export class CircularReference implements ICircularReference {
  public readonly location: Location;
  public readonly target: Location;
  private readonly keyDelimiter = '\u00B7'
  private readonly delimiter = ' → '

  constructor(location: string[], target: string[]) {
    if (isNotValidArray(location)) throw Error(expectedValidArrayErrorMessage('location'))
    if (isNotValidArray(target)) throw Error(expectedValidArrayErrorMessage('target'))
    this.location = { path: location }
    this.target = { path: target }
  }

  get depth(): number {
    return this.location.path.length - this.target.path.length
  }

  public readonly toString = (): string => `${this.join(this.location)}${this.delimiter}${this.join(this.target)}`

  public readonly toJSON = (): string => this.toString()

  private readonly join = ({ path }: Location): string => path.join(this.keyDelimiter)
}
