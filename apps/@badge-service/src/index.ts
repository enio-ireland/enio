import * as functions from 'firebase-functions'
import * as process from './lib'

export const createBuildBadge = functions.https.onRequest((request, response) => {
  process.createBuildBadge(true)
  response.send('Create build badge not fully implemented')
})

export const createCodeCoverageBadge = functions.https.onRequest((request, response) => {
  process.createCodeCoverageBadge('100', '50', '80')
  response.send('Create coverage badge not fully implemented')
})

export const getBadge = functions.https.onRequest((request, response) => {
  response.send('Get badge not fully implemented')
})
