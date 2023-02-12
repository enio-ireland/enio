import { createBuildBadge, createCodeCoverageBadge } from './createBadge'

describe('createBuildBadge', () => {
  it('creates a svg string for passing build', () => {
    const svg = createBuildBadge(true)
    expect(svg).toMatch(/<title>build: passing<\/title>/)
    expect(svg).toMatch(/fill="#4c1"/)
  })

  it('creates a svg string for failed build', () => {
    const svg = createBuildBadge(false)
    expect(svg).toMatch(/<title>build: failed<\/title>/)
    expect(svg).toMatch(/fill="#e05d44"/)
  })
})

describe('createCodeCoverageBadge', () => {
  it('creates a svg string for code coverage passing the target threshold', () => {
    const svg = createCodeCoverageBadge('95', '80', '90')
    expect(svg).toMatch(/<title>coverage: 95%<\/title>/)
    expect(svg).toMatch(/fill="#4c1"/)
  })

  it('creates a svg string for code coverage between the minimum and target threshold', () => {
    const svg = createCodeCoverageBadge('80', '80', '90')
    expect(svg).toMatch(/<title>coverage: 80%<\/title>/)
    expect(svg).toMatch(/fill="#dfb317"/)
  })

  it('creates a svg string for code coverage failing to reach the minimum threshold', () => {
    const svg = createCodeCoverageBadge('50', '80', '90')
    expect(svg).toMatch(/<title>coverage: 50%<\/title>/)
    expect(svg).toMatch(/fill="#e05d44"/)
  })
})
