import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  base: '',
  build: {
    chunkSizeWarningLimit: 550,
    outDir: '../',
    emptyOutDir: false,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/variables.scss";',
      },
    },
  },
  plugins: [
    eslint(),
    vue(),
  ],
  preview: {
    port: 8080,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    host: 'localhost',
    port: 8080,
  },
})
