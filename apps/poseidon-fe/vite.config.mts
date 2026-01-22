import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/poseidon-fe',
  server:{
    port: 4200,
    host: 'localhost',
  },
  preview:{
    port: 4300,
    host: 'localhost',
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    conditions: ['@pos-mono/source'],
    alias: {
      '@pos-mono/quote-form': path.resolve(__dirname, '../../libs/poseidon/quote-form/src/index.tsx'),
      '@pos-mono/quote-form-fields': path.resolve(__dirname, '../../libs/poseidon/quote-form-fields/src/index.ts'),
      '@pos-mono/poseidon-api': path.resolve(__dirname, '../../libs/poseidon-api/src/index.ts'),
      '@pos-mono/authentication': path.resolve(__dirname, '../../libs/authentication/src/index.ts'),
    },
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    name: '@pos-mono/poseidon-fe',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    }
  },
}));
