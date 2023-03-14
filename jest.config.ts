import type { Config } from 'jest'

const config: Config = {
  moduleNameMapper: {
    '^lib/(.*)$': '<rootDir>/lib/$1',
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'js', 'json', 'node']
}

export default config
