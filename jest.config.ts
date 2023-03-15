import type { Config } from 'jest'

const config: Config = {
  moduleNameMapper: {
    '^lib/(.*)$': '<rootDir>/lib/$1',
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json', 'node']
}

export default config
