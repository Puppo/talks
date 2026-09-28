import { cowtech } from '@cowtech/eslint-config'

export default [
  ...cowtech,
  {
    languageOptions: {
      parserOptions: {
        projectService: true
      }
    }
  },
  {
    // Freya transpiles .tsx to .js without rewriting import specifiers, so imports must use .js
    rules: {
      'import/extensions': [2, 'ignorePackages', { js: 'always', ts: 'always', tsx: 'never' }]
    }
  },
  {
    ignores: ['.freya/*']
  }
]
