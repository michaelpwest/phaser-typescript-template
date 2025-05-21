import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: ['.output/', 'android/', 'build/', 'dist/', 'ios/'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: {
      js,
    },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  tseslint.configs.recommended,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'comma-dangle': ['error', 'always-multiline'],
      'eol-last': ['error', 'always'],
      'linebreak-style': ['error', 'unix'],
      'no-console': 'off',
      'no-trailing-spaces': ['error'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'prettier/prettier': 'error',
    },
  },
  prettierConfig,
]);
