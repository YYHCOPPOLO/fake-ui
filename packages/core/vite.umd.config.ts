import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist/umd',
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'FakeUI',
      formats: ['umd'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'vue',
        },
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
      },
    },
  },
})
