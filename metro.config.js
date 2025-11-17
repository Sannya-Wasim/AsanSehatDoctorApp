const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const path = require('path');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  const { resolver: { sourceExts, assetExts } } = defaultConfig;

  const jitsiConfig = {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'), // remove svg from assets
      sourceExts: [...sourceExts, 'svg'], // add svg to sourceExts
    },
  };

  return mergeConfig(defaultConfig, jitsiConfig);
})();
