/* eslint-disable @typescript-eslint/naming-convention */

import { globalIgnores } from 'eslint/config';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import vuePlugin from 'eslint-plugin-vue';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import tailwindPlugin from 'eslint-plugin-better-tailwindcss';
import tsParser from '@typescript-eslint/parser';
import importXPlugin from 'eslint-plugin-import-x';
import type { Linter } from 'eslint';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

const twConfigs = () =>
  [
    {
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
    },
  ] satisfies Linter.Config[];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const importXConfigs = () =>
  // # FIX : Config is broken, don't use it for now
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  [
    {
      plugins: {
        import: importXPlugin,
      },
      languageOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      extends: ['plugin:import-x/recommended'],
      rules: {
        'import-x/no-dynamic-require': 'warn',
      },
    },
  ] as unknown as Linter.Config[];

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
  ...twConfigs(),
  // ...importXConfigs(),
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      'vue/no-v-html': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    },
  }
);
