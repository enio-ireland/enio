import { Tree, readProjectConfiguration, joinPathFragments } from '@nrwl/devkit'
import { TypedocGeneratorSchema } from '../../schema'

export const configureGitIgnore = (tree: Tree, options: TypedocGeneratorSchema): void => {
  const { root } = readProjectConfiguration(tree, options.project)
  const path = '.gitignore'
  const exclusionAnnotation = joinPathFragments('docs', root)
  const title = '#Project Docs'
  const titleAndAnnotation = `${title}\n${exclusionAnnotation}`
  if (!tree.isFile(path)) return tree.write(path, titleAndAnnotation)
  const content = tree.read('.gitignore')
  if (content.includes(exclusionAnnotation)) return
  if (!content.includes(title)) return tree.write(path, `${content.toString()}\n${titleAndAnnotation}`)
  const original = content.toString()
  const insertAt = original.indexOf(title) + title.length
  tree.write(path, `${original.slice(0, insertAt)}\n${exclusionAnnotation}${original.slice(insertAt)}`)
}
