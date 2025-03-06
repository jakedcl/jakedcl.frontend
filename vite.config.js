import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // vite.config.js

  server: {
    host: '0.0.0.0',  // Allows connections from your local network
    port: 3000,        // You can specify any port, 3000 is default
    strictPort: true,  // Ensures the port will not be changed if already in use
  },

})
