import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

function getDirectoiresSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true })

  return entries.filter(entry => entry.isDirectory()).map(entry => entry.name)
}

export default defineConfig({
  plugins: [vue(), dts({
    tsconfigPath: '../../tsconfig.build.json',
    outDir: 'dist/types',
  })],
  build: {
    outDir: 'dist/es',
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'FakeUI',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        'vue',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/vue-fontawesome',
        '@popperjs/core',
        'async-validator',
      ],
      output: {
        assetFileNames: (assetInfo) => {
          const fileName = assetInfo.names?.[0]

          if (!fileName) {
            return 'assets/unknown-[hash][extname]'
          }

          if (fileName === 'style.css') {
            return 'index.css'
          }

          return fileName
        },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
          if (id.includes('/packages/hooks')) {
            return 'hooks'
          }
          if (id.includes('/packages/utils')) {
            return 'utils'
          }

          // Button 和 Icon 存在循环依赖（Button.vue 直接导入 Icon.vue）
          // 将它们合并到同一个 chunk 中避免初始化顺序问题
          if (id.includes('/packages/components/Button') || id.includes('/packages/components/Icon')) {
            return 'Button'
          }

          for (const dirName of getDirectoiresSync('../components')) {
            if (id.includes(`/packages/components/${dirName}`)) {
              return dirName
            }
          }
        },
      },
    },
  },
})
