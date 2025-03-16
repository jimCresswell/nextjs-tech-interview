import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import vitest from "@vitest/eslint-plugin";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
  recommendedConfig: eslint.configs.recommended,
  globalIgnores: ["dist", "node_modules", ".next"],
});

/* @type import('eslint').Linter.FlatConfig */
export default tseslint.config(
  {
    // Explicitly add ignores at the top level
    ignores: ["dist/**", "node_modules/**", ".next/**"],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  ...compat.config({
    extends: ["next"],
  }),
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],

    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  {
    files: ["tests/**", "**/*.test.ts", "**/*.test.tsx"], // or any other pattern
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules, // you can also use vitest.configs.all.rules to enable all rules
      "vitest/max-nested-describe": ["error", { max: 3 }], // you can also modify rules' behavior using option like this
    },
  }
);
