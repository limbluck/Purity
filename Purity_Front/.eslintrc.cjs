module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'jest.polyfills.js'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'curly': ['warn' , 'multi-line'],
    'default-case': 'warn',
    'default-case-last': 'warn',
    'dot-notation': 'error',
    'no-console': 'warn',
    'no-else-return': 'error',
    'no-empty': 'error',
    'no-empty-function': 'error',
    'no-implicit-coercion': 'error',
    'no-multi-assign': 'error',
    'semi': ['warn', 'always'],
    'no-inner-declarations': 'off',
    'quotes': ['warn', 'single'],
    '@typescript-eslint/array-type': 'warn',
    '@typescript-eslint/consistent-type-definitions': ['warn' , 'type'],
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-inferrable-types': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/prefer-for-of': 'warn',
    'react-hooks/exhaustive-deps': 'off',
  }
}
