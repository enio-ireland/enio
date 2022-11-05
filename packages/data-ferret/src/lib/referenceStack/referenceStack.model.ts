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
   * Returns a negative number corresponding to how many iterations ago the reference
   * was registered in the stack relative to the last entry or null when it is not in the stack.
   */
  lastSeen: (reference: unknown) => number | null

  /**
   * Adds a new reference into the stack.
   */
  add: (reference: unknown) => void

  /**
   * Empties the reference stack and removes any flags added.
   */
  clear: () => void
}
