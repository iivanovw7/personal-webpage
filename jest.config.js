module.exports = {
  clearMocks: true,
  coverageDirectory: './dist/coverage',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(ttf|eot|woff|woff2|png|jpg|jpeg)$': '<rootDir>src/__mocks__/fileMock.js'
  },
  globals: {
    CONFIG: 'test'
  }
};
