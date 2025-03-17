import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "zod": path.resolve(__dirname, "node_modules/zod"),
      stream: 'stream-browserify',
      util: 'util',
      process: 'process/browser',
      buffer: 'buffer',
      global: path.resolve(__dirname, 'src/lib/global.js')
    },
    mainFields: ['browser', 'module', 'jsnext:main', 'jsnext', 'main']
  },
  define: {
    'process.env': {},
    global: 'globalThis',
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'UNRESOLVED_IMPORT') return;
        warn(warning);
      }
    }
  },
  optimizeDeps: {
    include: ['zod', '@hookform/resolvers/zod', 'buffer', 'process/browser']
  }
}));
