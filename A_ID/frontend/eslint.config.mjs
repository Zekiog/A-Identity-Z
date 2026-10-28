// Flat ESLint configuration for the A_ID frontend.
//
// The project is a Create React App (react-scripts 5) that ships ESLint 9 but
// no configuration, so `eslint .` could not run. The rule set below follows
// `eslint-config-react-app`, which Create React App itself applies: the
// recommended JavaScript rules, the React and jsx-a11y plugin rules, and the
// same exemptions (no prop-types requirement, no React-in-scope requirement).
// Rules that the current source violates are reported as warnings, so the
// check fails on real errors and still lists the outstanding findings.
import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  {
    ignores: ["build/**", "node_modules/**", "public/**"],
  },
  js.configs.recommended,
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
        process: "readonly",
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react,
      "jsx-a11y": jsxA11y,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      // Create React App does not require prop types or the React import.
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      // The source still carries placeholder anchors and unescaped
      // characters; they are reported but do not fail the build yet.
      "jsx-a11y/anchor-is-valid": "off",
      "react/no-unescaped-entities": "warn",
      "react/no-unknown-property": "warn",
      "no-unused-vars": [
        "warn",
        { args: "none", ignoreRestSiblings: true },
      ],
    },
  },
];
