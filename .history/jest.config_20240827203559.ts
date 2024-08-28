import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  coverageProvider: 'v8',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(wagmi|@wagmi|@tanstack|@radix-ui)/)',
  ],
  moduleDirectories: ['node_modules', '<rootDir>/'],
}

const asyncConfig = createJestConfig(config)

export default async () => {
  const nextJestConfig = await asyncConfig()
  return {
    ...nextJestConfig,
    moduleNameMapper: {
      ...nextJestConfig.moduleNameMapper,
      '^@/(.*)$': '<rootDir>/src/$1',
    },
  }
}