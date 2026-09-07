import { defineConfig } from 'vite';
import simpleHtmlPlugin from 'vite-plugin-simple-html';

export default defineConfig({
  plugins: [
    simpleHtmlPlugin({
      minify: true
    })
  ],  
  build: {
    outDir: 'docs',
  }
});