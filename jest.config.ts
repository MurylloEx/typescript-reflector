import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  silent: true,
  preset: 'ts-jest',
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['src', 'node_modules'],
  modulePathIgnorePatterns: [
    '^.+\\.d\\.ts$',
    '^.+\\.config\\.ts$'
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'ts'
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  rootDir: './',
  testRegex: '(.*\\.test\\.ts)$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  collectCoverageFrom: [
    '**/*.ts'
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node'
};

export default config;