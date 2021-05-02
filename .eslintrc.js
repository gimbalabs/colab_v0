module.exports = {
  extends: "universe",
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
};
