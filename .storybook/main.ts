import type { StorybookConfig } from '@storybook/vue3-vite'
import postcssColorMix from 'postcss-color-mix'
import postcssEach from 'postcss-each'
import postcssEachVariables from 'postcss-each-variables'
import postcssFor from 'postcss-for'
import postcssNested from 'postcss-nested'
import { createViteConfig } from '../vite.config.shared.ts'

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  async viteFinal(config) {
    const sharedConfig = createViteConfig()
    config.plugins = [...(config.plugins || []), ...(sharedConfig.plugins || [])]

    // 添加 PostCSS 配置以支持 @each 等自定义语法
    config.css = {
      postcss: {
        plugins: [
          postcssNested,
          postcssEachVariables,
          postcssEach({
            plugins: {
              beforeEach: [postcssFor, postcssColorMix],
            },
          }),
        ],
      },
    }

    return config
  },
}
export default config
