module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@attar/enterprise-module-sdk': '../../index.ts',
          '@sdk': '../../src',
        },
      },
    ],
  ],
};
