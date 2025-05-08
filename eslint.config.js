import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import vitest from '@vitest/eslint-plugin';
import pluginChaiFriendly from 'eslint-plugin-chai-friendly';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      'coverage',
      'dist',
      'node_modules',
      'src/assets/js/smtp.js',
    ],
  },
  {
    files: ['**/*.{js,ts,vue}'],
    rules: {
      'comma-dangle': ['error', 'always-multiline'],
      'eol-last': ['error', 'always'],
      'indent': ['error', 2],
      'no-console': 'error',
      'no-debugger': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-undef': 'off',
      'no-unused-vars': 'error',
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      'no-undef': 'off',
      'vue/html-indent': ['error', 2],
      'vue/max-attributes-per-line': ['error', {
        singleline: 3,
        multiline: 1,
      }],
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    files: ['src/**/*.spec.js', 'src/mocks/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...vitest.environments.env.globals,
      },
    },
    plugins: {
      vitest,
      'chai-friendly': pluginChaiFriendly,
    },
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
      'chai-friendly/no-unused-expressions': 'error',
    },
  },
];
