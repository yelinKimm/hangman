import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'

const env = loadEnv(
  'all',
  process.cwd()
);

export default defineConfig({
    base: env.DEV ? env.DEV : '/',
    plugins: [react(), viteTsconfigPaths()],
    server: {    
      open: true,
      port: 3000, 
    },
})