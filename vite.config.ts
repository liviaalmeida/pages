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
        filename: 'dist/stats.html',
        open: true,
        sourcemap: true,
        template: 'treemap',
      }),
    );
  }

  return array;
};

export default defineConfig(({ mode }) => ({
  base: '',
  build: {
    chunkSizeWarningLimit: 100,
    emptyOutDir: true,
    outDir: './dist',
    rollupOptions: {
      output: {
        manualChunks: {
          i18n: [
            'vue-i18n',
          ],
          mixpanel: [
            'mixpanel-browser',
          ],
          observe: [
            'intersection-observer',
            'vue-observe-visibility',
          ],
          vue: [
            'vue',
            'vue-router',
          ],
        },
      },
    },
    sourcemap: true,
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
    port: 1991,
  },
  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src'),
      'mixpanel-browser': 'mixpanel-browser/src/loaders/loader-module-core',
    },
  },
  server: {
    host: 'localhost',
    port: 1991,
  },
}));
