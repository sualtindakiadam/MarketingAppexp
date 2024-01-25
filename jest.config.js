
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/react-native'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node', 'ts', 'tsx',],
  "moduleNameMapper": {
    "@react-native-async-storage/async-storage": "<rootDir>/__mocks__/async-storage.js"
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@react-native-async-storage/async-storage|react-native|@react-navigation|react-redux)/',
  ],
  moduleNameMapper: {
    "^@react-native-async-storage/async-storage/jest$": "<rootDir>/__mocks__/@react-native-async-storage/async-storage.js"
  }
  ,
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
  //moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  globals: {
    __DEV__: true,
  },
};
