module.exports = {
  dependencies: {
    '@amplitude/analytics-react-native': {
      platforms: {
        android: null, // ❌ Disable native autolinking for Android
        ios: null,     // ❌ Disable native autolinking for iOS (optional)
      },
    },
  },
};
