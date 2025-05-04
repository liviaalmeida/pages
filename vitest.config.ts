import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    coverage: {
      include: [
        'src',
      ],
      exclude: [
        'src/**.d.ts',
        'src/i18n.ts',
        'src/main.ts',
        'src/assets/js/smtp.js',
      ],
      provider: 'v8',
      thresholds: {
        statements: 95,
        branches: 95,
        functions: 95,
        lines: 95,
      },
    },
    environment: 'jsdom',
    globals: true,
    pool: 'threads',
    setupFiles: ['./vitest.setup.ts'],
  },
})
