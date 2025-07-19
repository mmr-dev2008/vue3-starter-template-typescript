/* eslint-disable @typescript-eslint/naming-convention */
import { globalIgnores } from 'eslint/config';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import vuePlugin from 'eslint-plugin-vue';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import tailwindPlugin from 'eslint-plugin-better-tailwindcss';
import importXPlugin from 'eslint-plugin-import-x';
import type { Linter, ESLint } from 'eslint';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

const twConfigs = {
  plugins: { 'better-tailwindcss': tailwindPlugin },
  settings: {
    'better-tailwindcss': {
      entryPoint: '',
      tailwindConfig: '',
      callees: [
        [
          '^class|classnames|classNames|cva|ctl|clsx|cn|cns|cx|cc|clb|cnb|dcnb|objstr|tv|twJoin|twMerge$',
          [{ match: 'strings' }],
        ],
      ],
    },
  },
  rules: {
    'better-tailwindcss/no-duplicate-classes': 'error',
    'better-tailwindcss/no-conflicting-classes': 'error',
    'better-tailwindcss/no-unnecessary-whitespace': 'warn',
    'better-tailwindcss/enforce-consistent-class-order': 'warn',
    'better-tailwindcss/enforce-consistent-variable-syntax': 'error',
  },
} satisfies Linter.Config;

const tsExtensions = ['.ts', '.tsx', '.vue', '.cts', '.mts', '.ctsx', '.mtsx'];
const jsExtensions = ['.mjs', '.js', '.jsx', '.vue', '.cjs'];
const allExtensions = [...jsExtensions, ...tsExtensions];

const importXConfig = {
  plugins: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    import: importXPlugin as unknown as ESLint.Plugin,
  },
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import-x/external-module-folders': ['node_modules', 'node_modules/@types'],
    'import-x/ignore': ['node_modules', String.raw`\.(scss|css|svg|json)$`],
    'import-x/extensions': allExtensions,
    'import-x/parsers': {
      '@typescript-eslint/parser': allExtensions,
    },
    'import-x/resolver': { typescript: true },
  },

  rules: {
    'import/first': 'error',
    'import/newline-after-import': 'warn',
    'import/no-absolute-path': 'error',
    'import/no-amd': 'error',
    'import/no-duplicates': 'error',
    'import/no-empty-named-blocks': 'error',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default': 'error',
    'import/no-named-default': 'error',
    'import/no-relative-packages': 'error',
    'import/no-self-import': 'error',
    'import/no-unresolved': ['error', { caseSensitiveStrict: true }],
    'import/no-useless-path-segments': 'warn',
    'import/no-webpack-loader-syntax': 'error',
    'import/order': 'warn',
  },
} satisfies Linter.Config;

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', 'node_modules']),
  vuePlugin.configs['flat/recommended'],
  vueTsConfigs.all,
  skipFormatting,
  prettierPlugin,
  twConfigs,
  // importXConfig, //Config is broken
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      'vue/no-v-html': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    },
  }
);
