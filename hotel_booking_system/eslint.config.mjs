import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    env: {
      node: true,
      commonjs: true,
      es2021: true,
      jest: true,
    },
    extends: "eslint:recommended",
    parserOptions: {
      ecmaVersion: 12,
    },
    rules: {
      noConsole: "warn",
      noUndef: "error",
      semi: "error",
      semiSpacing: "error",
      eqeqeq: "warn",
      noInvalidThis: "error",
      noReturnAssign: "error",
      noUnusedExpressions: [
        "error",
        {
          allowTernary: true,
        },
      ],
      noUselessConcat: "error",
      noUselessReturn: "error",
      noConstantCondition: "warn",
      noUnusedVars: [
        "warn",
        {
          argsIgnorePattern: "req|res|next|__",
        },
      ],
      indent: [
        "error",
        2,
        {
          switchCase: 1,
        },
      ],
      noMixedSpacesAndTabs: "warn",
      spaceBeforeBlocks: "error",
      spaceInParens: "error",
      spaceInfixOps: "error",
      spaceUnaryOps: "error",
      quotes: ["error", "single"],
      maxLen: [
        "error",
        {
          code: 200,
        },
      ],
      maxLines: [
        "error",
        {
          max: 500,
        },
      ],
      keywordSpacing: "error",
      multilineTernary: ["error", "never"],
      noMixedOperators: "error",
      noMultipleEmptyLines: [
        "error",
        {
          max: 2,
          maxEOF: 1,
        },
      ],
      noWhitespaceBeforeProperty: "error",
      nonblockStatementBodyPosition: "error",
      objectPropertyNewline: [
        "error",
        {
          allowAllPropertiesOnSameLine: true,
        },
      ],
      arrowSpacing: "error",
      noConfusingArrow: "error",
      noDuplicateImports: "error",
      noVar: "error",
      objectShorthand: "off",
      preferConst: "error",
      preferTemplate: "warn",
    },
  },
];
