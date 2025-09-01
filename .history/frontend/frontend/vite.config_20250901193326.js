import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
export default {
  server: {
    proxy: {
      "/api": "http://localhost:4000"
    }
  }
}