const { getDefaultConfig } = require("@expo/metro-config");

// df = default config
const df = getDefaultConfig(__dirname);

df.resolver.assetExts = df.resolver.assetExts.filter((ext) => ext !== "svg");
df.resolver.sourceExts.push("svg");
df.transformer = {
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
  getTransformerOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: false,
    },
  }),
};
