import { BuildExecutorSchema } from './schema'
import { ExecutorContext, getPackageManagerCommand } from '@nrwl/devkit'
import { spawn } from 'child_process'
// import { join, relative, resolve, sep } from 'path'
// import { copyFileSync, existsSync, mkdirSync, mkdtempSync, writeFileSync } from 'fs'
// import { tmpdir } from 'os'
// readJsonFile
// TypedocOptions

export default async function runExecutor(options: BuildExecutorSchema, context: ExecutorContext) {
  console.log('Building Typedoc...', options)
  // const project = context.workspace.projects[context.projectName]
  // const args = toTypedocOptions(options, context)
  // const cmd = `${getPackageManagerCommand().exec} typedoc`
  // const cmdArgs = toArguments(toTypedocOptions(options, context))
  // const cmdOpts = {
  //   cwd: options.workspaceDocs ? context.root : project.root,
  //   shell: true
  // }

  // return new Promise<{ success: boolean }>(resolve => {
  //   console.log({ command /*args, processOpts*/ })
  //   const childProcess = spawn(command /*, args, processOpts*/)
  //   process.on('exit', () => childProcess.kill())
  //   process.on('SIGTERM', () => childProcess.kill())
  //   childProcess.stdout.on('data', data => console.info(data.toString()))
  //   childProcess.stderr.on('data', data => console.error(data.toString()))
  //   childProcess.on('close', code => resolve({ success: code === 0 }))
  // })
}
