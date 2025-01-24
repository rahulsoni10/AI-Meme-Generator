import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // Forward requests starting with /api
        target: 'http://localhost:5000', // Your backend server address
        changeOrigin: true, // Change the origin of the host header to the target URL
        secure: false, // Set to true if your backend uses HTTPS
        // You can add rewrite if needed:
        // rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix
      },
    },
  },
});