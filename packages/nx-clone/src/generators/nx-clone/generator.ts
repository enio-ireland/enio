import { Tree } from '@nrwl/devkit'
import { checkPaths, cloneProject } from './process'
import type { Schema } from './schema';

export default async function (tree: Tree, schema: Schema) {
  const locations = checkPaths(schema)
  cloneProject(locations, schema)
}
