// eslint.config.mjs — root
import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import tseslint from 'typescript-eslint';
import unocss from '@unocss/eslint-config/flat';
import globals from 'globals';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
console.log('unocssss');
const ss = 21222
export default [
  // 1. Ignore build artifacts
  {
    ignores: ['**/node_modules/**', '**/.nuxt/**', '**/.output/**', '**/dist/**', '**/coverage/**'],
  },

  // 2. Base presets
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/recommended'],

  // 3. Vue parser + overrides
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      // 🚫 Disable multi-word component names rule
      'vue/multi-word-component-names': 'off',
    },
  },

  // 4. Project-wide rules
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'error',
    },
  },

  // 5. UnoCSS + Prettier
  unocss,
  prettierRecommended,
];
