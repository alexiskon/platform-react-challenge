import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/platform-react-challenge/',
  resolve: {
    alias: {
      '@images': path.resolve(__dirname, './src/assets/images'),
      '@components': path.resolve(__dirname, './src/components'),
      '@styles': path.resolve(__dirname, './src/styles'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use '@styles/_variables.scss' as *;
          @use '@styles/_mixins.scss' as *;
        `
      }
    }
  }
})
