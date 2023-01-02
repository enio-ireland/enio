import { join } from 'path'
import { readRootPackageJson, workspaceRoot, writeJsonFile } from '@nrwl/devkit'
import { name } from '../../../../../project.json'

export const registerNpmScript = (): void => {
  const packageJson = readRootPackageJson() as ReturnType<typeof readRootPackageJson> & { scripts?: Record<string, string> }
  if (!packageJson.scripts) packageJson.scripts = {}
  packageJson.scripts[name] = `nx ${name}`
  packageJson.scripts[`${name}:affected`] = `nx affected --target=${name} --all`
  writeJsonFile(join(workspaceRoot, 'package.json'), packageJson)
}
