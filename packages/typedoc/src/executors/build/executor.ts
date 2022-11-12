import { BuildExecutorSchema } from './schema'
import { ExecutorContext, getPackageManagerCommand } from '@nrwl/devkit'
import { name } from '../../../project.json'
import { toArguments } from './process'
import { spawn } from 'child_process'

export default async function runExecutor(options: BuildExecutorSchema, context: ExecutorContext) {
  const config = context.workspace.projects[context.projectName]
  const command = `${getPackageManagerCommand().exec} ${name}`
  const args = toArguments(options)
  const processOpts = { cwd: config.root || context.root, shell: true }
  return new Promise<{ success: boolean }>(resolve => {
    console.log({ command, args, processOpts })
    const childProcess = spawn(command, args, processOpts)
    process.on('exit', () => childProcess.kill())
    process.on('SIGTERM', () => childProcess.kill())
    childProcess.stdout.on('data', data => console.info(data.toString()))
    childProcess.stderr.on('data', data => console.error(data.toString()))
    childProcess.on('close', code => resolve({ success: code === 0 }))
  })
}
