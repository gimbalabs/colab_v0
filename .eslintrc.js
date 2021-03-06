export default {
  extends: ["universe", "plugin:react-hooks/recommended"],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreMemberSort: true,
        ignoreDeclarationSort: true,
        allowSeparatedGroups: true,
      },
    ],
  },

  plugins: ["react", "react-native", "react-hooks", "import"],
};
