import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    ignores: ['android/', 'dist/', 'ios/', 'node_modules/'],
  },
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { files: ['**/*.{js,mjs,cjs,ts}'], languageOptions: { globals: globals.browser } },
  { files: ['**/*.{js,mjs,cjs,ts}'], plugins: { js }, extends: ['js/recommended'] },
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
      'prettier/prettier': ['warn', { singleQuote: true, tabWidth: 2, trailingComma: 'all' }],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
    },
  },
  prettierConfig,
]);
