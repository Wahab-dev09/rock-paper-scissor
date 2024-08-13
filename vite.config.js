import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/rock-paper-scissor/',
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, 
      },
      mangle: true,
      format: {
        comments: false,
      },
    },
  },
});
