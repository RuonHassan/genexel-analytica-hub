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
      "zod": path.resolve(__dirname, "src/lib/zodExports.ts"),
      "@hookform/resolvers/zod": path.resolve(__dirname, "src/lib/mockZodResolver.ts"),
      stream: 'stream-browserify',
      util: 'util',
      process: 'process/browser',
      buffer: 'buffer'
    },
    mainFields: ['browser', 'module', 'jsnext:main', 'jsnext', 'main']
  },
  define: {
    'process.env': {},
    global: 'globalThis',
  },
  build: {
    target: 'es2020',
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/node_modules/]
    },
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'UNRESOLVED_IMPORT') return;
        warn(warning);
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      'buffer', 
      'process/browser',
      '@supabase/supabase-js'
    ],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  }
}));
