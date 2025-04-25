import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';
import stylisticJs from '@stylistic/eslint-plugin-js';
import { defineConfig } from 'eslint/config';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import stylisticJsx from '@stylistic/eslint-plugin-jsx';
import stylisticTs from '@stylistic/eslint-plugin-ts';

export default defineConfig([
  {
    ignores: ['.astro/content.d.ts', 'dist/*'],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['**/*.{js,ts}'],
    plugins: {
      '@stylistic/js': stylisticJs,
      '@stylistic/ts': stylisticTs,
    },
    rules: {
      '@stylistic/js/semi': ['error', 'always'],
      '@stylistic/ts/member-delimiter-style': [
        'error',
        {
          multiline: { delimiter: 'semi', requireLast: true },
          singleline: { delimiter: 'semi', requireLast: false },
        },
      ],
      '@stylistic/js/no-multiple-empty-lines': ['error', { max: 1 }],
    },
  },
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
    },
    plugins: {
      astro: eslintPluginAstro,
      '@stylistic/js': stylisticJs,
    },
    rules: {
      'astro/semi': ['error', 'always'],
      '@stylistic/js/no-multiple-empty-lines': ['error', { max: 1 }],
      'astro/no-unused-css-selector': 'error',
    },
  },
  {
    files: ['**/*.tsx'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: { ...globals.browser },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@stylistic/jsx': stylisticJsx,
      '@stylistic/js': stylisticJs,
      '@stylistic/ts': stylisticTs,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      '@stylistic/js/no-multiple-empty-lines': ['error', { max: 1 }],
    },
  },
]);
