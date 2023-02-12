export const getLines = (string: string) =>
  string
    .split(/\r?\n/)
    .map(ln => ln.trim())
    .filter(ln => ln)
