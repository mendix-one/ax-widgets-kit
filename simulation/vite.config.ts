import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['mobx', 'mobx-react-lite'],
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: ['dev.amoza.xyz'],
  },
})
