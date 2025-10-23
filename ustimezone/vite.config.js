import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",       // ensures relative paths work on Vercel
  build: {
    outDir: "dist", // Vercel expects this folder by default
  },
})
