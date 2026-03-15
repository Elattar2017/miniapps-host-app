const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const sdkRoot = path.resolve(__dirname, '../..');

/**
 * Metro configuration for WeConnect Sample App
 * Resolves the Enterprise Module SDK from the local monorepo source.
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders: [sdkRoot],
  resolver: {
    // Prevent duplicate React/RN from SDK's root node_modules
    blockList: [
      new RegExp(
        path
          .resolve(sdkRoot, 'node_modules/react-native/.*')
          .replace(/[/\\]/g, '[/\\\\]'),
      ),
      new RegExp(
        path
          .resolve(sdkRoot, 'node_modules/react/.*')
          .replace(/[/\\]/g, '[/\\\\]'),
      ),
    ],
    // Resolve shared deps from sample-app's node_modules only
    extraNodeModules: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-native': path.resolve(__dirname, 'node_modules/react-native'),
      '@react-navigation/native': path.resolve(
        __dirname,
        'node_modules/@react-navigation/native',
      ),
      '@react-navigation/native-stack': path.resolve(
        __dirname,
        'node_modules/@react-navigation/native-stack',
      ),
      '@react-navigation/bottom-tabs': path.resolve(
        __dirname,
        'node_modules/@react-navigation/bottom-tabs',
      ),
      'react-native-mmkv': path.resolve(
        __dirname,
        'node_modules/react-native-mmkv',
      ),
      'react-native-screens': path.resolve(
        __dirname,
        'node_modules/react-native-screens',
      ),
      'react-native-safe-area-context': path.resolve(
        __dirname,
        'node_modules/react-native-safe-area-context',
      ),
      'react-native-svg': path.resolve(
        __dirname,
        'node_modules/react-native-svg',
      ),
    },
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(sdkRoot, 'node_modules'),
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
