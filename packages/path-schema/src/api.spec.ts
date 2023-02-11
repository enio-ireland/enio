import type { Reference } from './index'
import { getPaths } from './index'

describe('API', () => {
  it('correctly creates path map based with schema with minimal details', () => {
    type RootPaths = 'opensource' | 'enterprise'
    type ProjectCategoryPaths = 'projects'
    type ProjectPaths = 'badges'
    type BadgePaths = 'coverageBadge' | 'buildBadge'

    type Badges = Reference & {
      [key in BadgePaths]: Reference
    }

    type Project = Reference & {
      [key in ProjectPaths]: Badges
    }

    type ProjectCategories = Reference & {
      [key in ProjectCategoryPaths]: Project
    }

    type DB = Reference & {
      [key in RootPaths]: ProjectCategories
    }

    const dbRefs = getPaths<DB>(`
      @root » #opensource #enterprise
      #opensource » #projects
      #enterprise » #projects
      #projects » #badges
      #badges » #coverageBadge #buildBadge
      #coverageBadge
      #buildBadge
    `)
  })

  it('correctly creates path map based with schema with specific aliases', () => {
    type RootPaths = 'openSource' | 'enterprise'
    type ProjectCategoryPaths = 'project'
    type ProjectPaths = 'badge'
    type BadgePaths = 'coverage' | 'build'

    type Badges = Reference & {
      [key in BadgePaths]: Reference
    }

    type Project = Reference & {
      [key in ProjectPaths]: Badges
    }

    type ProjectCategories = Reference & {
      [key in ProjectCategoryPaths]: Project
    }

    type DB = Reference & {
      [key in RootPaths]: ProjectCategories
    }

    const dbRefs = getPaths<DB>(`
      @root » #opensource #enterprise
      #opensource 'openSource' » #projects
      #enterprise 'enterprise' » #projects
      #projects 'project' » #badges
      #badges 'badge' » #coverageBadge #buildBadge
      #coverageBadge 'coverage'
      #buildBadge 'build'
    `)
  })

  it('correctly creates path map based with schema with specific path values', () => {
    type RootPaths = 'openSource' | 'enterprise'
    type ProjectCategoryPaths = 'project'
    type ProjectPaths = 'badge'
    type BadgePaths = 'coverage' | 'build'

    type Badges = Reference & {
      [key in BadgePaths]: Reference
    }

    type Project = Reference & {
      [key in ProjectPaths]: Badges
    }

    type ProjectCategories = Reference & {
      [key in ProjectCategoryPaths]: Project
    }

    type DB = Reference & {
      [key in RootPaths]: ProjectCategories
    }

    const dbRefs = getPaths<DB>(`
      @root » #opensource #enterprise
      #opensource 'openSource' public » #projects
      #enterprise 'enterprise' private » #projects
      #projects 'project' » #badges
      #badges 'badge' » #coverageBadge #buildBadge
      #coverageBadge 'coverage'
      #buildBadge 'build'
    `)
  })

  it('correctly creates path map based with schema with specific paths with keys to replace', () => {
    type RootPaths = 'openSource' | 'enterprise'
    type ProjectCategoryPaths = 'project'
    type ProjectPaths = 'badge'
    type BadgePaths = 'coverage' | 'build'

    type Badges = Reference & {
      [key in BadgePaths]: Reference
    }

    type Project = Reference & {
      [key in ProjectPaths]: Badges
    }

    type ProjectCategories = Reference & {
      [key in ProjectCategoryPaths]: Project
    }

    type DB = Reference & {
      [key in RootPaths]: ProjectCategories
    }

    const dbRefs = getPaths<DB>(`
      @root » #opensource #enterprise
      #opensource 'openSource' opensource » #projects
      #enterprise 'enterprise' enterprise » #projects
      #projects 'project' projects/[name] » #badges
      #badges 'badge' [reporting/badges] » #coverageBadge #buildBadge
      #coverageBadge 'coverage'
      #buildBadge 'build'
    `)
  })
})
