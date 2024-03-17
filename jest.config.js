module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|native-base|phosphor-react-native|react-redux|@react-navigation)/)',
  ],
  setupFiles: ['<rootDir>/jest/setup.js'],
};
