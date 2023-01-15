import { ProjectConfiguration } from '@nrwl/devkit'

/**
 * Sanitized and federated execution details for typedoc generastor.
 */
export interface GeneratorExecutionParams {
  /** Project configuration */
  projectConfig: ProjectConfiguration

  /** Project's name taken from workspace.json or else taken from typedoc command */
  projectName: ProjectConfiguration['name']

  /** Project's location relative to the root of the workspace */
  projectRoot: ProjectConfiguration['root']

  /** Project type */
  projectType: ProjectConfiguration['projectType']

  /** Documentation's location for project relative to Nx's workspace root directory */
  outputDir: string
}
