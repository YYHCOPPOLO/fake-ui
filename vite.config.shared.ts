import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export function createViteConfig(): UserConfig {
  return {
    plugins: [
      vue(),
    ],
    optimizeDeps: {
      include: ['vue'],
    },
  }
}
