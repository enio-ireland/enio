import { join } from 'path'
import { readRootPackageJson, workspaceRoot, writeJsonFile } from '@nrwl/devkit'

export const registerNpmScript = (): void => {
  const packageJson = readRootPackageJson() as ReturnType<typeof readRootPackageJson> & { scripts?: Record<string, string> }
  if (!packageJson.scripts) packageJson.scripts = {}
  packageJson.scripts['nx-install'] = 'nx affected --target=nx-install --all'
  writeJsonFile(join(workspaceRoot, 'package.json'), packageJson)
}
