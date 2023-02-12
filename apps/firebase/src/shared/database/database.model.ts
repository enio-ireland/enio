import type { Reference } from '@enio.ai/path-schema'

type RootKeys = 'projects'
type ProjectsKeys = 'enterprise' | 'openSource'
type EnterpriseKeys = 'badges'
type OpenSourceKeys = 'badges'
type BadgesKeys = 'buildPass' | 'codeCoverage'

type BadgesScope = Reference & {
  [key in BadgesKeys]: Reference
}

type OpenSourceScope = Reference & {
  [key in OpenSourceKeys]: BadgesScope
}

type EnterpriseScope = Reference & {
  [key in EnterpriseKeys]: BadgesScope
}

type ProjectCategoryScope = Reference & {
  [key in ProjectsKeys]: OpenSourceScope & EnterpriseScope
}

export type DB = Reference & {
  [key in RootKeys]: ProjectCategoryScope
}
