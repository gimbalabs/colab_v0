module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["module:react-native-dotenv"],
      [
        require.resolve("babel-plugin-module-resolver"),
        {
          root: ["./src/"],
          alias: {
            // define aliases to shorten the import paths
            assets: "./src/assets",
            common: "./src/common",
            components: "./src/components",
            containers: "./src/containers",
            contexts: "./src/contexts",
            lib: "./src/lib",
            icons: "./src/assets/icons",
            images: "./src/assets/images",
            interfaces: "./src/common/interfaces",
            screens: "./src/screens",
            stacks: "./src/stacks",
            styles: "./src/styles",
            tabs: "./src/tabs",
            types: "./src/common/types",
            utils: "./src/lib/utils.ts",
          },
          extensions: [".js", ".jsx", ".tsx", ".ts", ".ios.js", ".android.js"],
        },
      ],
    ],
  };
};
