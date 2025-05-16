import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Fine-Dining/FineWare',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});
