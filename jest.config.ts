import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
   collectCoverage: true,
   coverageDirectory: "coverage",
   coverageReporters: ["text", "lcov"],
   collectCoverageFrom: [
     "src/**/*.{js,jsx,ts,tsx}",
     "!src/**/*.d.ts",
     "!src/index.tsx",
     "!src/reportWebVitals.ts",
   ],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(wagmi|@wagmi|@tanstack|viem)/)',
  ],
  moduleDirectories: ['node_modules', '<rootDir>/'],
}

export default createJestConfig(config)