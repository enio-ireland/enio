import { makeBadge, Format } from 'badge-maker'

const standardFormat: Format = {
  style: 'flat',
  labelColor: 'grey',
  message: ''
}

export const createBuildBadge = (success: boolean): string =>
  makeBadge({
    ...standardFormat,
    label: 'build',
    message: success ? 'passing' : 'failed',
    color: success ? 'success' : 'critical'
  })

export const createCodeCoverageBadge = (percentage: string, minThreshold: string, maxThreshold: string): string =>
  makeBadge({
    ...standardFormat,
    label: 'coverage',
    message: `${percentage}%`,
    color: +percentage < +minThreshold ? 'critical' : +percentage < +maxThreshold ? 'yellow' : 'success'
  })
