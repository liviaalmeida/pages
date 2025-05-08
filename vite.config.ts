import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';

import { visualizer } from 'rollup-plugin-visualizer';

const plugins = (visualize = false) => {
  const array = [
    eslint(),
    vue(),
  ];

  if (visualize) {
    array.push(
      visualizer({
        template: 'treemap',
        open: true,
        filename: 'dist/stats.html',
        sourcemap: true,
      }),
    );
  }

  return array;
};

export default defineConfig(({ mode }) => ({
  base: '',
  build: {
    chunkSizeWarningLimit: 550,
    outDir: './dist',
    emptyOutDir: false,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/variables.scss";',
      },
    },
  },
  plugins: plugins(mode === 'view'),
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
}));
