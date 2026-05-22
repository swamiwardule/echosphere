import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://143.110.185.14:8080',
        changeOrigin: true,
        secure: false,
      },
      '/web': {
        target: 'http://143.110.185.14:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})