const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  env: {
    node: 1,
    browser: 1,
    jest: true,
    es6: true
  },
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
    'guard/jsdoc'
  ],
  plugins: ['prettier'],
  globals: {
    exampleGlobalVariable: true
  },
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    strict: 1,
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true
      }
    ],
    'max-len': [2, { code: 120 }],
    eqeqeq: 1,
    'consistent-return': ['off', { treatUndefinedAsUnspecified: true }],
    'comma-dangle': ['error', 'never'],
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    indent: ['error', 2, { SwitchCase: 1 }],
    "no-tabs": 0,
    'arrow-body-style': [2, 'as-needed'],
    'class-methods-use-this': 0,
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'no-console': 1,
    'no-unused-vars': 2,
    'no-use-before-define': 0,
    'prefer-template': 2,
    "import/order": [
      "error",
      {
        groups: ['builtin', 'external', ['parent'], ['sibling', 'index']],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc', /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */
          caseInsensitive: true /* ignore case. Options: [true, false] */
        }
      }
    ],
    "import/no-unresolved": [2, { commonjs: true, amd: true }],
    "import/named": 2,
    "import/namespace": 2,
    "import/default": 2,
    "import/export": 2,
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        optionalDependencies: false
      }
    ],
  },
  settings: {
    'import/extensions': ['.js']
  },
  parserOptions: {
    ecmaFeatures: {
      modules: true
    }
  }
};
