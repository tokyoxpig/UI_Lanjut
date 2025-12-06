import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Cegah vite-plugin-vue-devtools jalan di Node
let plugins = [vue()]

if (process.env.NODE_ENV !== 'production') {
  try {
    const vueDevTools = require('vite-plugin-vue-devtools').default
    plugins.push(vueDevTools())
  } catch (e) {
    console.warn('DevTools tidak dimuat:', e.message)
  }
}

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})