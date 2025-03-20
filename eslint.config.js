import globals from 'globals';

import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';


import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import plugin from 'eslint-plugin-react';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2022,
    },
  },
  ...compat.extends('airbnb'),
  {
    plugins: {
      prettier: prettierPlugin,
    },
  },
  {
    ignores: ['node_modules', 'dist'],
  },
  {
    files: ['**/*.{js,jsx}'],
    rules: {
      ...eslintConfigPrettier.rules,
      'prefer-const': 'error',
    },
  },
 }
];
