import { https } from 'firebase-functions'
import * as admin from 'firebase-admin'
import { db } from './shared'
import { isValidType, sendInvalidQueryParamsError, createBuildBadge, createCodeCoverageBadge } from './lib'

export const generateAndStoreBuildBadge = https.onRequest(async (request, response) => {
  const { project, passed } = request.query as Record<string, string>
  if (!isValidType(project, 'string')) return sendInvalidQueryParamsError(response, 'project', 'string')
  if (!isValidType(passed, 'string')) return sendInvalidQueryParamsError(response, 'passed', 'string')
  const svg = createBuildBadge(passed === 'true')
  const path = db.projects.openSource.badges.buildPass.pathWithKeys({ projectName: project })
  try {
    await admin.database().ref(path).push(svg)
  } catch {
    /* return to exit early with send 500 */
  }
  response.send(svg)
})

export const generateAndStoreCodeCoverageBadge = https.onRequest(async (request, response) => {
  const { project, percentage, minThreshold, maxThreshold } = request.query as Record<string, string>
  if (!isValidType(project, 'string')) return sendInvalidQueryParamsError(response, 'project', 'string')
  if (!isValidType(percentage, 'string')) return sendInvalidQueryParamsError(response, 'percentage', 'string')
  if (!isValidType(minThreshold, 'string')) return sendInvalidQueryParamsError(response, 'minThreshold', 'string')
  if (!isValidType(maxThreshold, 'string')) return sendInvalidQueryParamsError(response, 'maxThreshold', 'string')
  const svg = createCodeCoverageBadge(percentage, minThreshold, maxThreshold)
  const path = db.projects.openSource.badges.codeCoverage.pathWithKeys({ projectName: project })
  admin.database().ref(path).push(svg)
  try {
    await admin.database().ref(path).push(svg)
  } catch {
    /* return to exit early with send 500 */
  }
  response.send(svg)
})

export const getBadge = https.onRequest(async (request, response) => {
  const { project, badgeType } = request.query as Record<string, string>
  if (!isValidType(project, 'string')) return sendInvalidQueryParamsError(response, 'project', 'string')
  if (!isValidType(badgeType, 'string')) return sendInvalidQueryParamsError(response, 'badgeType', 'string')
  let [path, svg] = ['', '']
  badgeType === 'build' && (path = db.projects.openSource.badges.buildPass.pathWithKeys({ projectName: project }))
  badgeType === 'coverage' && (path = db.projects.openSource.badges.codeCoverage.pathWithKeys({ projectName: project }))
  try {
    const dbResponse = await admin.database().ref(path).get()
    svg = dbResponse.val()
  } catch {
    /* return to exit early with send 500 */
  }
  response.send(svg)
})
