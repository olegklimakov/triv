module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-typescript/base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'arrow-parens': ['error', 'as-needed'],
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'enum',
        format: ['UPPER_CASE']
      },
    ],
  },
};
