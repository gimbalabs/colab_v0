module.exports = {
  extends: ["universe", "plugin:react-hooks/recommended"],
  "sort-imports": [
    "error",
    {
      ignoreCase: false,
      ignoreDeclarationSort: false,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
      allowSeparatedGroups: false,
    },
  ],

  plugins: ["react", "react-native", "react-hooks"],
};
