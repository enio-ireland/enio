import { Tree } from '@nrwl/devkit'
import { GeneratorExecutionParams } from '../../utils'

export const configureGitIgnore = (tree: Tree, outputDir: GeneratorExecutionParams['outputDir']): void => {
  const path = '.gitignore'
  const title = '#Project Docs'
  const titleAndAnnotation = `${title}\n${outputDir}`
  if (!tree.isFile(path)) return tree.write(path, titleAndAnnotation)
  const content = tree.read('.gitignore')
  if (content.includes(outputDir)) return
  if (!content.includes(title)) return tree.write(path, `${content.toString()}\n${titleAndAnnotation}`)
  const original = content.toString()
  const insertAt = original.indexOf(title) + title.length
  tree.write(path, `${original.slice(0, insertAt)}\n${outputDir}${original.slice(insertAt)}`)
}
