const nxPreset = require('@nrwl/jest/preset').default

module.exports = {
  ...nxPreset,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/node_modules/**', '!**/*.spec.*', '!**/*.config.*', '!**/index.*'],
  coverageReporters: ['lcov', 'text', 'json'],
  reporters: ['default', 'github-actions']
}
