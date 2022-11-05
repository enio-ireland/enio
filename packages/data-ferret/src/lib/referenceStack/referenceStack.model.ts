export interface ReferenceStack {
  /**
   * Total number of references in the stack.
   */
  size: number

  /**
   * Returns true if reference is already registered.
   */
  exists: (reference: unknown) => boolean

  /**
   * Adds a new reference into the stack.
   */
  add: (reference: unknown) => void

  /**
   * Empties the reference stack and removes any flags added.
   */
  clear: () => void
}
