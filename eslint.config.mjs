import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import jasmine from "eslint-plugin-jasmine";
import jquery from "eslint-plugin-jquery";

export default defineConfig([
  { files: ["**/*.{mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { sourceType: 'module', globals: { ...globals.browser, ...globals.jasmine } } },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.js,
        ...globals.browser,
        ...globals.jasmine,
        ...globals.jquery,
        ...globals.node
      }
    },
    rules: {
      "semi": [ "error", "never" ],
      "quotes": [2, "single", { "avoidEscape": true }],
      "comma-dangle": ["error", "never"],
      "indent": ["error", 2]
    },
    plugins: { js, jasmine, jquery },
    extends: ["js/recommended", "jasmine/recommended"]
  },
]);
