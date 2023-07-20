import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  base: '/tic-tac-toe/',
  plugins: [],
  resolve: {
    alias: { '@': '/src' }
  }
});