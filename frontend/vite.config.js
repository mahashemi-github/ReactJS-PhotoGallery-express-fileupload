import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {

    proxy: {
      '/foo': 'http://localhost:3000',
    //   "/api": {
    //       target: "https://localhost:3000",
    //       changeOrigin: true,
    //       secure: false,      
    //       rewrite: (path) => path.replace(/^\/api/, ''),
    //     }
    }
  }
})
