import { https } from 'firebase-functions'
import * as process from './lib'

export const createBuildBadge = https.onRequest((request, response) => {
  const { passed } = request.params
  const svg = process.createBuildBadge(passed == 'true')
  response.send(svg)
})

export const createCodeCoverageBadge = https.onRequest((request, response) => {
  const { percentage, minThreshold, maxThreshold } = request.params
  const svg = process.createCodeCoverageBadge(percentage, minThreshold, maxThreshold)
  response.send(svg)
})

export const getBadge = https.onRequest((request, response) => {
  response.send('Get badge not fully implemented')
})
