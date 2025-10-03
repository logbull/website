import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
    rules: {
      '@next/next/no-img-element': 'off',
      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-sync-scripts': 'off',
      '@next/next/inline-script-id': 'off',
      '@next/next/next-script-for-ga': 'off',
      '@next/next/no-page-custom-font': 'off',
    },
  },
];

export default eslintConfig;
