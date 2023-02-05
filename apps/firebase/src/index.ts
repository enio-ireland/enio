import { https } from 'firebase-functions'
import { isValidType, sendInvalidQueryParamsError, createBuildBadge, createCodeCoverageBadge } from './lib'

export const buildBadge = https.onRequest((request, response) => {
  const { passed } = request.query as Record<string, string>
  if (!isValidType(passed, 'string')) return sendInvalidQueryParamsError(response, 'passed', 'string')
  const svg = createBuildBadge(passed === 'true')
  response.send(svg)
})

export const codeCoverageBadge = https.onRequest((request, response) => {
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
