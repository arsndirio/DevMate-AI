import js from "@eslint/js";
import babelParser from "@babel/eslint-parser";
import { defineConfig } from "eslint/config";

/**
 * ESLint configuration — DevMate AI
 *
 * CATATAN: typescript-eslint v8.x tidak mendukung TypeScript 7.0 (hanya <6.1.0).
 * Menggunakan @babel/eslint-parser sebagai parser TypeScript untuk ESLint.
 * Type-aware linting dilakukan via `npm run typecheck` (tsc --noEmit).
 * Update ke typescript-eslint ketika versi yang mendukung TS 7 dirilis.
 * Lihat docs/TECH_DECISIONS.md TD-009.
 */
export default defineConfig([
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "dist/**",
      "coverage/**",
      "*.config.js",
      "*.config.mjs",
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: true,
        babelOptions: {
          configFile: "./babel.config.json",
        },
      },
    },
    rules: {
      "no-console": "warn",
      "prefer-const": "error",
      "no-var": "error",
      // Unused variables and undefs are strictly enforced by TypeScript compiler (tsc --noEmit)
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-duplicate-imports": "error",
      "eqeqeq": ["error", "always"],
    },
  },
]);
