import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path' // <--- Você precisa desta linha!

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Isso mapeia o "@" para a pasta "src" do seu projeto
      '@': path.resolve(__dirname, './src'),
    },
  },
})