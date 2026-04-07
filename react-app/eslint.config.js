import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importX from 'eslint-plugin-import-x'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),

  // Base JS recommended rules
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended],
  },

  // TypeScript type-aware rules
  {
    files: ['**/*.{ts,tsx}'],
    extends: [tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
    },
  },

  // React Hooks
  {
    files: ['**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat.recommended],
  },

  // React Refresh (Vite HMR)
  {
    files: ['**/*.{ts,tsx}'],
    extends: [reactRefresh.configs.vite],
  },

  // React X - core React rules
  {
    files: ['**/*.{ts,tsx}'],
    extends: [reactX.configs.recommended],
  },

  // React DOM - DOM-specific React rules
  {
    files: ['**/*.{ts,tsx}'],
    extends: [reactDom.configs.recommended],
  },

  // JSX Accessibility
  {
    files: ['**/*.{ts,tsx}'],
    extends: [jsxA11y.flatConfigs.recommended],
  },

  // Import sorting & validation
  {
    files: ['**/*.{ts,tsx}'],
    extends: [importX.flatConfigs.recommended, importX.flatConfigs.typescript],
    rules: {
      'import-x/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import-x/no-duplicates': 'warn',
      'import-x/no-unresolved': 'off',
    },
  },

  // Prettier (must be last to override conflicting rules)
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [prettier],
  },
])
