import { registeredClasses } from '../shared/consts'

export const registerClassTypes = (...classes: unknown[]): void => {
  const list = ([] as unknown[]).concat(classes);
  while (registeredClasses.length) registeredClasses.pop();
  list.forEach(entry => registeredClasses.push(entry))
}
