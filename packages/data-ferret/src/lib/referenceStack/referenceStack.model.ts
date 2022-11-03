export interface ReferenceStack {
  /**
   * Total number of references in the stack.
   */
  size: number

  /**
   * Returns true when the stack self-referencing.
   */
  circular: boolean

  /**
   * Returns true if reference is already registered.
   */
  exists: (reference: unknown) => boolean

  /**
   * Registers a new reference in the stack.
   */
  add: (reference: unknown) => ReferenceStack

  /**
   * Empties the reference stack, after removing a discreet Symbol marker added to identify
   * circular references
   */
  clear: () => void
}

export type CircularReferenceFoundCallback = () => { stack: ReferenceStack; map: string }
