import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        configFile: false,
        babelrc: false,
        compact: false,
      },
    }),
  ],
  server: {
    port: 5174,
    open: false,
    host: true,
    middlewareMode: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
  },
})
