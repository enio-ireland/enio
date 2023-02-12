import { https } from 'firebase-functions'
import * as admin from 'firebase-admin'
import { isValidType, sendInvalidQueryParamsError, createBuildBadge, createCodeCoverageBadge } from './lib'

export const generateAndStoreBuildBadge = https.onRequest((request, response) => {
  const { project, passed } = request.query as Record<string, string>
  if (!isValidType(project, 'string')) return sendInvalidQueryParamsError(response, 'project', 'string')
  if (!isValidType(passed, 'string')) return sendInvalidQueryParamsError(response, 'passed', 'string')
  const svg = createBuildBadge(passed === 'true')
  admin.database().ref(useRef(root.opensource.projects.badges.build.path, { [DynamicKey.ProjectName]: project }))
  response.send(svg)
})

export const generateAndStoreCodeCoverageBadge = https.onRequest((request, response) => {
  const { percentage, minThreshold, maxThreshold } = request.query as Record<string, string>
  if (!isValidType(percentage, 'string')) return sendInvalidQueryParamsError(response, 'percentage', 'string')
  if (!isValidType(minThreshold, 'string')) return sendInvalidQueryParamsError(response, 'minThreshold', 'string')
  if (!isValidType(maxThreshold, 'string')) return sendInvalidQueryParamsError(response, 'maxThreshold', 'string')
  const svg = createCodeCoverageBadge(percentage, minThreshold, maxThreshold)
  response.send(svg)
})

export const getBadge = https.onRequest((request, response) => {
  response.send('Get badge not fully implemented')
})
