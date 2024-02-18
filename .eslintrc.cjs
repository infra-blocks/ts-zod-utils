module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  plugins: ["prettier"],
  extends: ["eslint:recommended", "prettier", "plugin:prettier/recommended"],
  ignorePatterns: ["!.mocharc.cjs", "!.c8rc.json"],
  overrides: [
    {
      files: ["**/*.json"],
      plugins: ["json-format"],
      settings: {
        "json/json-with-comments-files": [],
      },
    },
    {
      files: ["**/*.ts"],
      plugins: ["@typescript-eslint"],
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
    },
  ],
  env: {
    node: true,
  },
};
