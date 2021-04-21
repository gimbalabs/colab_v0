module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        require.resolve("babel-plugin-module-resolver"),
        {
          root: ["./src/"],
          alias: {
            // define aliases to shorten the import paths
            common: "./src/common",
            components: "./src/components",
            containers: "./src/containers",
            contexts: "./src/contexts",
            interfaces: "./src/common/interfaces",
            screens: "./src/screens",
            tabs: "./src/tabs",
          },
          extensions: [".js", ".jsx", ".tsx", ".ios.js", ".android.js"],
        },
      ],
    ],
  };
};
