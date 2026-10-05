import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    base: './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      sourcemap: false,
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          // Recharts/d3 are deliberately NOT given a manual chunk. They are
          // reachable only from the lazily-loaded ProjectPage route, and forcing
          // them into a named chunk makes Rollup hoist shared modules into it,
          // which then becomes a static dependency of the entry chunk. That put
          // ~400 kB of charting code in the first-paint modulepreload list for
          // every visitor. Letting them fall into the lazy chunk keeps them off
          // the critical path until a project case study is actually opened.
          manualChunks(id) {
            if (id.includes('node_modules/motion')) {
              return 'vendor-motion';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'vendor-lucide';
            }
          },
        },
      },
    },
  };
});
