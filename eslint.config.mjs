import nextConfig from 'eslint-config-next'
import nextTypeScriptConfig from 'eslint-config-next/typescript'

const config = [
  ...nextConfig,
  ...nextTypeScriptConfig,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'warn',
    },
  },
]

export default config