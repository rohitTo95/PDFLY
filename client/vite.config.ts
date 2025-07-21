import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "./.env") });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['react-pdf', 'pdfjs-dist'],
    exclude: ['pdfjs-dist/build/pdf.worker.min.js']
  },
  define: {
    global: 'globalThis',
  },
  build: {
    // Ensure proper build for SPA deployment
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          pdf: ['react-pdf'],
        },
      },
    },
    target: 'esnext'
  },
  server: {
    port: 3000,
    fs: {
      allow: ['..'],
    },
  },
});
