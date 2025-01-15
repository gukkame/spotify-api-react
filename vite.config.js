import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Bind to all IPs
    port: process.env.PORT || 8080, // Use Railway's PORT or default to 3000
  },
})
