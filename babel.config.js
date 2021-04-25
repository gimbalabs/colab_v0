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
            lib: "./src/lib",
            interfaces: "./src/common/interfaces",
            screens: "./src/screens",
            tabs: "./src/tabs",
            types: "./src/common/types",
          },
          extensions: [".js", ".jsx", ".tsx", ".ts", ".ios.js", ".android.js"],
        },
      ],
    ],
  };
};
