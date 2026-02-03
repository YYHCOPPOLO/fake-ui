import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import terser from '@rollup/plugin-terser'
import vue from '@vitejs/plugin-vue'
import { delay } from 'lodash-es'
import shell from 'shelljs'
import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'
import hooksPlugin from './hooks-plugin'

const TRY_MOVE_FILES_DELAY = 800 as const
const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'

function moveFiles() {
  try {
    readFileSync('./dist/umd/index.css.gz')
    shell.cp('./dist/umd/index.css', './dist/index.css')
  }
  catch (e) {
    delay(moveFiles, TRY_MOVE_FILES_DELAY)
  }
}

export default defineConfig({
  plugins: [
    vue(),
    compression({
      include: /.(cjs|css)$/i,
    }),
    terser({
      compress: {
        drop_console: isProd && ['log'],
        drop_debugger: isProd,
        passes: isProd ? 4 : 1,
        global_defs: {
          '@DEV': JSON.stringify(isDev),
          '@PROD': JSON.stringify(isProd),
          '@TEST': JSON.stringify(isTest),
        },
      },
    }),
    hooksPlugin({
      rmFiles: ['./dist/umd', './dist/index.css'],
      afterBuild: moveFiles,
    }),
  ],
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
