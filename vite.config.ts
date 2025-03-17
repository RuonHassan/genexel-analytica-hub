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
    },
  },
  optimizeDeps: {
    include: ['zod']
  },
  build: {
    commonjsOptions: {
      include: [/zod/, /node_modules/]
    },
    rollupOptions: {
      external: ['zod'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          zod: 'zod'
        }
      }
    }
  }
}));
