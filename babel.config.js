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
            components: "./src/components",
            containers: "./src/containers",
            contexts: "./src/contexts",
            interfaces: "./src/interfaces",
            organizer: "./src/screens/organizer",
            screens: "./src/screens",
          },
          extensions: [".js", ".jsx", ".tsx", ".ios.js", ".android.js"],
        },
      ],
    ],
  };
};
