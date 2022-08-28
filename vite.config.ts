import path from 'path'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import envCompatible from "vite-plugin-env-compatible";

const ENV_PREFIX = "ST_";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), envCompatible({ prefix: ENV_PREFIX })],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
});
