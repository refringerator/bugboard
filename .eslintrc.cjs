module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    // "eslint:recommended",
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
    // 'react-app', ?? react/recommended
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', 'vite.config.ts', 'supabase'], // , ".eslintrc.cjs"
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/triple-slash-reference': 'error',
    'react/jsx-uses-vars': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
