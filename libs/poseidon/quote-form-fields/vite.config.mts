
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/libs/poseidon/quote-form-fields',
  plugins: [react(), tailwindcss()],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [],
  // },
  test: {
    'name': 'quote-form-fields',
    'watch': false,
    'globals': true,
    'environment': "jsdom",
    'include': ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    'reporters': ["default"],
    'coverage': {
    'reportsDirectory': './test-output/vitest/coverage',
    'provider': 'v8' as const,
}
  },
}));
