import { readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import terser from '@rollup/plugin-terser'
import vue from '@vitejs/plugin-vue'
import { delay } from 'lodash-es'
import shell from 'shelljs'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import hooksPlugin from './hooks-plugin'

const TRY_MOVE_FILES_DELAY = 800 as const
const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'

function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true })

  return entries.filter(entry => entry.isDirectory()).map(entry => entry.name)
}

function moveFiles() {
  try {
    readFileSync('./dist/es/theme')
    shell.cp('./dist/es/theme', './dist')
  }
  catch (e) {
    delay(moveFiles, TRY_MOVE_FILES_DELAY)
  }
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: '../../tsconfig.build.json',
      outDir: 'dist/types',
    }),
    hooksPlugin({
      rmFiles: ['./dist/es', './dist/theme', './dist/types'],
      afterBuild: moveFiles,
    }),
    terser({
      compress: {
        sequences: isProd,
        arguments: isProd,
        drop_console: isProd && ['log'],
        drop_debugger: isProd,
        passes: isProd ? 4 : 1,
        global_defs: {
          '@DEV': JSON.stringify(isDev),
          '@PROD': JSON.stringify(isProd),
          '@TEST': JSON.stringify(isTest),
        },
      },
      format: {
        semicolons: false,
        shorthand: isProd,
        braces: !isProd,
        comments: !isProd,
      },
      mangle: {
        toplevel: isProd,
        eval: isProd,
        keep_classnames: isDev,
        keep_fnames: isDev,
      },
    }),
  ],
  build: {
    outDir: 'dist/es',
    minify: false,
    cssCodeSplit: true,
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

          if (fileName === 'style.css') {
            return 'index.css'
          }

          if (assetInfo.type === 'asset' && /\.css$/i.test(fileName)) {
            return 'theme/[name].-[hash].[ext]'
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
          if (id.includes('/packages/utils') || id.includes('plugin-vue:export-helper')) {
            return 'utils'
          }

          for (const dirName of getDirectoriesSync('../components')) {
            if (id.includes(`/packages/components/${dirName}`)) {
              return dirName
            }
          }
        },
      },
    },
  },
})
